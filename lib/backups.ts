import JSZip from "jszip";

import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import Site from "@/lib/models/site";
import Backup from "@/lib/models/backup";
import { logger } from "@/lib/logger";
import { sendBackupEmail, sendRestoreEmail } from "@/lib/emails";

export async function createBackup(
  userId: string,
  type: "manual" | "auto" = "manual",
) {
  await dbConnect();
  const user = await User.findById(userId).lean();
  const sites = await Site.find({ userId }).lean();
  const zip = new JSZip();

  zip.file("backup.json", JSON.stringify({ user, sites }, null, 2));
  const content = await zip.generateAsync({ type: "nodebuffer" });
  const backup = await Backup.create({
    userId,
    type,
    data: content,
    size: content.length,
  });

  if (type === "auto") {
    const limit = Number(process.env.BACKUP_RETENTION || 5);
    const autos = await Backup.find({ userId, type: "auto" })
      .sort({ createdAt: -1 })
      .skip(limit);

    if (autos.length) {
      await Backup.deleteMany({ _id: { $in: autos.map((b) => b._id) } });
    }
  }

  logger.info(`[backup] created ${type} for ${userId}`);

  if (type === "manual" && user?.email) {
    sendBackupEmail(userId, user.email).catch(logger.error);
  }

  return backup;
}

export async function listBackups(userId: string) {
  await dbConnect();
  const backups = await Backup.find({ userId })
    .sort({ createdAt: -1 })
    .select("type size createdAt");

  return backups;
}

export async function getBackup(userId: string, id: string) {
  await dbConnect();
  const backup = await Backup.findOne({ _id: id, userId });

  return backup;
}

export async function restoreBackup(userId: string, id: string) {
  const backup = await getBackup(userId, id);

  if (!backup) return false;

  const user = await User.findById(userId).lean();

  const zip = await JSZip.loadAsync(backup.data);
  const content = await zip.file("backup.json")?.async("string");

  if (!content) return false;
  const data = JSON.parse(content);

  if (data.user?._id !== userId) return false;

  await User.updateOne({ _id: userId }, data.user);
  await Site.deleteMany({ userId });
  if (Array.isArray(data.sites) && data.sites.length) {
    await Site.insertMany(data.sites.map((s: any) => ({ ...s, userId })));
  }

  logger.info(`[backup] restored for ${userId}`);

  if (user?.email) {
    sendRestoreEmail(userId, user.email).catch(logger.error);
  }

  return true;
}
