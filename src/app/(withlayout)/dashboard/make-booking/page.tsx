import BookingSection from "@/components/Home/bookingSection/BookingSection";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const BookingPage = () => {
  return (
    <div>
      <div className="bg-white  p-5 rounded-2xl shadow-lg">
        <UMBreadCrumb
          items={[
            {
              label: "Dashboard",
              link: "/dashboard",
            },
            {
              label: "My Booking List",
              link: "/dashboard/my-booking-lists",
            },
          ]}
        />
        <BookingSection />
      </div>
    </div>
  );
};

export default BookingPage;
