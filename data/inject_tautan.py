import pandas as pd
import re

# Fungsi untuk membuat slug dari nama
def slugify(nama):
    if pd.isna(nama):
        return ""
    nama = str(nama).lower().strip()
    nama = re.sub(r'[^\w\s-]', '', nama)
    nama = re.sub(r'\s+', '-', nama)
    return nama

# Baca file Excel
df = pd.read_excel("data_tamu.xlsx")

# Validasi nama kosong
if df["nama"].isna().any():
    print("⚠️ Ada nama tamu yang kosong. Harap periksa file Excel.")

# Generate slug dari nama
df["slug"] = df["nama"].apply(slugify)

# Validasi slug duplikat
duplikat = df[df["slug"].duplicated(keep=False)]
if not duplikat.empty:
    print("⚠️ Slug duplikat ditemukan:")
    print(duplikat[["nama", "slug"]])

# Inject tautan undangan
base_url = "https://dwidase.github.io/undanganpernikahan-test-001/?guest="
df["tautan_undangan"] = base_url + df["slug"]

# Simpan sebagai Excel dan JSON
df.to_excel("data_tamu_dengan_tautan.xlsx", index=False)
df.to_json("data_tamu_dengan_tautan.json", orient="records", indent=2, force_ascii=False)

print("✅ File berhasil dibuat: data_tamu_dengan_tautan.xlsx & .json")
