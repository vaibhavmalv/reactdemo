import ContactUsForm from "@/components/pages/ContactUs/ContactUs";

export default function ContactUs() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex  py-40 items-center ">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}