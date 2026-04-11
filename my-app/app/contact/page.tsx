import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Palak Agarwal",
  description:
    "Get in touch with Palak Agarwal for content writing, ghostwriting, book editing, and other writing services.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app/contact" },
};

export default function Page() {
  return <ContactPage />;
}
