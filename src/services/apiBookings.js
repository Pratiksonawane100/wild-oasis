import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constant";
import { getToday } from "../utils/helpers";
export async function getBookings({ filter, page }) {
  let query = supabase.from("bookings").select("*", { count: "exact" });

  // Apply the filter if it exists
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  console.log(data);
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  console.log(data);
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice,status,numNights")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  // Fetch data from the bookings table
  let { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("*");

  // Fetch data from the guests table
  let { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("*");

  if (bookingsError || guestsError) {
    console.error(bookingsError || guestsError);
    throw new Error("Data could not be loaded");
  }

  // Transform and combine data
  const transformedData = bookings.map((booking) => {
    // Find the corresponding guest for this booking
    const guest = guests.find((guest) => guest.id === booking.guestId) || {};

    return {
      id: booking.id,
      status: booking.status,
      guests: {
        fullName: guest.fullName || "Unknown Guest",
        countryFlag: guest.countryFlag || "",
        country: guest.nationality || "Unknown", // Adjust field if needed
      },
      numNights: booking.numNights || 0,
    };
  });

  console.log("Transformed Data:", transformedData); // Inspect transformed data
  return transformedData;
}
