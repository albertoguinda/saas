const sendMock = jest.fn();

jest.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
    constructor() {}
  },
}));

process.env.RESEND_API_KEY = "key";

import { sendEmail } from "@/lib/email";

beforeEach(() => {
  sendMock.mockClear();
});

test("sends email", async () => {
  await sendEmail({ to: "a@test.com", subject: "hi", html: "<b>hi</b>" });
  expect(sendMock).toHaveBeenCalled();
});
