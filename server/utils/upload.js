import supabase from "../utils/supabase.js";

export async function uploadFile(event) {
    const avatarFile = event.target.files[0];
    try {
        const { data, error } = await supabase.storage.from('home_service').upload('service_photo', avatarFile, {
            cacheControl: '3600',
            upsert: false
        });
        if (error) {
            console.error("เกิดข้อผิดพลาดในการอัปโหลด:", error.message)
        } else {
            console.log("อัปโหลดสำเร็จ:", data)
        }
    } catch (error) {
        console.error("Uploading file is error", error.message)
    }
}

