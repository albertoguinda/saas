import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

function getRootDir(zip) {
  try {
    const output = execSync(
      `unzip -l "${zip}" | awk 'NR>4 {print $4; exit}'`,
    ).toString();
    return output.trim().split("/")[0];
  } catch {
    return "";
  }
}

function main() {
  const folder = join(process.env.HOME || "", "Desktop", "REPOS_GITHUB");
  let files = [];
  try {
    files = readdirSync(folder).filter((f) => f.endsWith(".zip"));
  } catch {}

  const rows = [];
  for (const file of files) {
    const full = join(folder, file);
    const root = getRootDir(full) || file.replace(/\.zip$/i, "");
    rows.push(
      `| ${root} | repo | ${file} | ${root} | - | Recurso premium reutilizable | media | premium/ | |`,
    );
  }

  const lines = [
    "# INVENTARIO_PREMIUM.md",
    "",
    "Este documento recopila los componentes y recursos de alto valor localizados en archivos ZIP externos.",
    "",
  ];

  if (!rows.length) {
    lines.push(
      "**Nota:** en la ruta `~/Desktop/REPOS_GITHUB/*.zip` no se encontraron archivos para analizar, por lo que el inventario está vacío.",
      "",
      "| Nombre | Tipo | Repo ZIP origen | Ruta interna | Tecnología actual | Por qué es valioso | Dificultad migrar | Carpeta destino | Ideas adicionales |",
      "| ----------------------------- | ---- | --------------- | ------------ | ----------------- | ------------------------------------------------------------ | -------------- | --------------- | ----------------- |",
      "| _Sin archivos ZIP detectados_ | -    | -               | -            | -                 | No se localizaron repositorios comprimidos para inventariar. | -             | -               | -                 |",
    );
  } else {
    lines.push(
      "| Nombre | Tipo | Repo ZIP origen | Ruta interna | Tecnología actual | Por qué es valioso | Dificultad migrar | Carpeta destino | Ideas adicionales |",
      "| ----------------------------- | ---- | --------------- | ------------ | ----------------- | ------------------ | ----------------- | --------------- | ----------------- |",
      ...rows,
    );
  }

  writeFileSync(join("docs", "INVENTARIO_PREMIUM.md"), lines.join("\n") + "\n");
}

main();
