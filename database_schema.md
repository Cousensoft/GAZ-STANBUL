# Gazistanbul Modül Veri Sözlüğü (V5.2)

Bu döküman, GazSocial "Kullanıcı Yönetimi" modülünde kullanılan teknik verilerin mantıksal tanımlarını içerir.

---

## 1.7.4 GazSocial Kullanıcı Yönetimi

### A. Kimlik ve Profil Verileri
*   **User ID (UID) :** Veritabanı benzersiz kimlik numarası.
*   **Username (@handle) :** Kullanıcının platform içi etiketi.
*   **Account Type :** Kurumsal, Standart üyelik türü.
*   **Trust Score (Güven Skoru) :** 0-100 arası; spam raporları, etkileşim kalitesi ve hesap yaşına göre hesaplanan güvenilirlik puanı.

### B. Etkileşim Metrikleri
*   **Followers/Following :** Takipçi ve takip edilen sayısı.
*   **Post Count :** Paylaşılan toplam içerik adedi.
*   **Last Active :** Kullanıcının son oturum veya işlem zamanı.

### C. Moderasyon ve Güvenlik
*   **Account Status :** ACTIVE (Aktif), RESTRICTED (Kısıtlı - Sadece izleme), BANNED (Yasaklı - Giriş engelli).
*   **Warning Count (Uyarı Sayacı) :** Moderatörler tarafından gönderilen toplam ihlal bildirimi sayısı.
*   **Audit Logs :** Kullanıcının IP adresi, işlem tipi ve tarihini içeren teknik kayıtlar.
