import pandas as pd

# Baca file Excel
df = pd.read_excel("data_tamu.xlsx")

# Tambahkan kolom tautan undangan
df["tautan_undangan"] = "https://dwidase.github.io/undanganpernikahan-test-001/?guest=" + df["slug"]

# Simpan sebagai file baru
df.to_excel("data_tamu_dengan_tautan.xlsx", index=False)

# Simpan juga sebagai JSON jika perlu
df.to_json("data_tamu_dengan_tautan.json", orient="records", indent=2)
