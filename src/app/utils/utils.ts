export const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC", // Giữ cố định timezone
    }).format(new Date(dateString));
}