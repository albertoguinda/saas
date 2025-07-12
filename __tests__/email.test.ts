// mocks must be defined before imports
const sendMock = jest.fn();

jest.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
    constructor() {}
  },
}));

process.env.RESEND_API_KEY = "key";

jest.mock("@/lib/models/emailLog", () => ({
  __esModule: true,
  default: { create: jest.fn() },
}));
jest.mock("@/lib/dbConnect", () => ({ __esModule: true, default: jest.fn() }));
import { sendEmail } from "@/lib/emails";
import EmailLog from "@/lib/models/emailLog";

beforeEach(() => {
  sendMock.mockClear();
  (EmailLog.create as jest.Mock).mockClear();
});

test("sends email and logs", async () => {
  await sendEmail({
    userId: "1",
    to: "a@test.com",
    subject: "hi",
    html: "<b>hi</b>",
    type: "test",
  });
  expect(sendMock).toHaveBeenCalled();
  expect(EmailLog.create).toHaveBeenCalledWith(
    expect.objectContaining({ userId: "1", to: "a@test.com", type: "test" }),
  );
});
