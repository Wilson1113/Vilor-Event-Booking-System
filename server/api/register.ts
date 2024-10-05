// server/api/register.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const contentType = getHeader(event, "content-type");
  const authToken = getHeader(event, "authorization");
  const {
    eventId,
    userFullName,
    email,
    contactNumber,
    nric,
    age,
    country,
    gender,
  } = body;

  try {
    const response = await $fetch(
      `https://quiz.vilor.com/api/events/${eventId}/register`,
      {
        method: "POST",
        body: {
          userFullName,
          email,
          contactNumber,
          nric,
          age,
          country,
          gender,
        },
        headers: {
          "Content-Type": contentType,
          Authorization: authToken,
        },
      }
    );

    return response;
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
});
