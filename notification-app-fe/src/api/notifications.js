export async function fetchNotifications() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return await response.json();
}