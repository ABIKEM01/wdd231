export async function fetchServices() {
  try {
    const res = await fetch("./data/services.json");
    if (!res.ok) throw new Error("Failed to load services data");
    const data = await res.json();
    console.log("finalproject", data);
    return data;
  } catch (err) {
    console.error("fetchServices error:", err);
    throw err;
  }
}
