import { slugify } from "@/utils/slugify";

/* -----------------------------------------------
   RAW PROPERTY DATA
----------------------------------------------- */
const rawProperties = [
  {
    id: 1,
    title: {
      id: "Lahan Strategis Pinggir Jalan Dekat Rumah Sakit Airan",
      en: "Strategic Roadside Land Near Airan Hospital",
    },
    type: { id: "Tanah", en: "Land" },

    location: "Airan, Lampung Selatan, Lampung",
    address: "Jl. Airan Raya, Airan",
    price: "Rp 1.108.250.000",
    perMeter: "Rp 1.550.000 / m²",
    img: "/Image1.png",

    desc: {
      id: "Lahan strategis siap bangun di pinggir jalan dekat RS Airan.",
      en: "Strategically located land ready for development, situated on a main roadside near Airan Hospital.",
    },

    premium: false,

    company: {
      name: "PT Namura Property Lampung",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      website: "-",
    },

    consultant: {
      name: "Martin Simorangkir",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      photo: "/Martin.jpg",
    },

    details: {
      id: {
        transaksi: "Jual",
        kamarTidur: "-",
        kamarMandi: "-",
        luasTanah: "715 m²",
        tipeProperti: "Tanah",
        alamat: "Jl. Airan Raya, Airan, Lampung Selatan",
        lokasi: "Airan, Lampung Selatan, Lampung",
        listrik: "-",
        sertifikat: "SHM",
        hadap: "Barat",
        group: "Secondary",
        furnish: "-",
        perMeter: "Rp 1.550.000 / m²",
        terdaftarPada: "-",
        idListing: "142025-PMKD00001",
      },
      en: {
        transaction: "For Sale",
        bedrooms: "-",
        bathrooms: "-",
        landArea: "715 m²",
        propertyType: "Land",
        address: "Jl. Airan Raya, Airan, South Lampung",
        location: "Airan, South Lampung, Lampung",
        electricity: "-",
        certificate: "Freehold (SHM)",
        facing: "West",
      },
    },

    gallery: [
      "/TanahAiran1.jpeg",
      "/TanahAiran2.jpeg",
      "/TanahAiran3.jpeg",
      "/TanahAiran4.jpeg",
    ],
  },

  {
    id: 2,
    title: {
      id: "Lahan Strategis Siap Huni Di Perum Sejahtera Hajimena",
      en: "Strategic Residential Land in Sejahtera Hajimena Estate",
    },
    type: { id: "Tanah", en: "Land" },

    location: "Lampung Selatan, Lampung",
    address: "Jl. Mawar Perum Sejahtera Hajimena",
    price: "Rp 492.450.000",
    perMeter: "Rp 1.050.000 / m²",
    img: "/ImageHJ.png",

    desc: {
      id: "Tanah siap bangun di perumahan strategis dekat kampus Poltekkes.",
      en: "Build-ready land located in a strategic housing area near the Poltekkes campus.",
    },

    premium: false,

    company: {
      name: "PT Nolan",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      website: "-",
    },

    consultant: {
      name: "Martin Simorangkir",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      photo: "/Martin.jpg",
    },

    details: {
      id: {
        transaksi: "Jual",
        kamarTidur: "-",
        kamarMandi: "-",
        luasTanah: "469 m²",
        tipeProperti: "Tanah",
        alamat: "Jl. Mawar Perum Sejahtera Hajimena",
        lokasi: "Lampung Selatan, Lampung",
        listrik: "-",
        sertifikat: "SHM",
        hadap: "Barat",
        group: "Primary",
        furnish: "-",
        perMeter: "-",
        terdaftarPada: "-",
        idListing: "112025-DPK0002",
      },
      en: {
        transaction: "For Sale",
        bedrooms: "-",
        bathrooms: "-",
        landArea: "469 m²",
        propertyType: "Land",
        address: "Jl. Mawar Sejahtera Hajimena Residence",
        location: "South Lampung, Lampung",
        electricity: "-",
        certificate: "Freehold (SHM)",
        facing: "West",
      },
    },

    gallery: ["/ImageHJ.png"],
  },

  {
    id: 3,
    title: {
      id: "Lahan Strategis Siap Huni Dekat Perum Bumi Asri Kedamaian",
      en: "Strategic Residential Land Near Bumi Asri Kedamaian",
    },
    type: { id: "Tanah", en: "Land" },

    location: "Kota Bandar Lampung, Lampung",
    address: "Jl. Ridwan Rais, Kedamaian",
    price: "Rp 4.340.000.000",
    perMeter: "Rp 1.550.000 / m²",
    img: "/ImageKDM.png",

    desc: {
      id: "Lahan yang sangat strategis dekat perumahan Bumi Asri Kedamaian.",
      en: "Highly strategic land located near the Bumi Asri Kedamaian housing complex.",
    },

    premium: false,

    company: {
      name: "PT Nolan",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      website: "-",
    },

    consultant: {
      name: "Martin Simorangkir",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      photo: "/Martin.jpg",
    },

    details: {
      id: {
        transaksi: "Jual",
        kamarTidur: "-",
        kamarMandi: "-",
        luasTanah: "-",
        tipeProperti: "Tanah",
        alamat: "Jl. Ridwan Rais, Kedamaian",
        lokasi: "Kota Bandar Lampung, Lampung",
        listrik: "-",
        sertifikat: "SHM",
        hadap: "Selatan",
        group: "Secondary",
        furnish: "-",
        perMeter: "Rp 1.550.000 / m²",
        terdaftarPada: "-",
        idListing: "112025-BDG0003",
      },
      en: {
        transaction: "For Sale",
        bedrooms: "-",
        bathrooms: "-",
        landArea: "-",
        propertyType: "Land",
        address: "Jl. Ridwan Rais, Kedamaian",
        location: "Bandar Lampung, Lampung",
        electricity: "-",
        certificate: "Freehold (SHM)",
        facing: "South",
      },
    },

    gallery: ["/ImageKDM.png"],
  },

  {
    id: 4,
    title: {
      id: "Lahan Siap Huni Strategis Dekat Pom Bensin Karang Anyar",
      en: "Strategic Land Near Karang Anyar Gas Station",
    },
    type: { id: "Tanah", en: "Land" },

    location: "Lampung Selatan, Lampung",
    address: "Jl Raya Karang Anyar, Lampung Selatan",
    price: "Rp 47.500.000.000",
    perMeter: "Rp 950.000 / m²",
    img: "/ImageKRG.png",

    desc: {
      id: "Lahan strategis pinggir jalan dekat pom bensin Karang Anyar.",
      en: "Strategic roadside land located near the Karang Anyar gas station.",
    },

    premium: true,

    company: {
      name: "PT Nolan",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      website: "-",
    },

    consultant: {
      name: "Martin Simorangkir",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      photo: "/Martin.jpg",
    },

    details: {
      id: {
        transaksi: "Jual",
        kamarTidur: "-",
        kamarMandi: "-",
        luasTanah: "50.000 m²",
        tipeProperti: "Tanah",
        alamat: "Jl Raya Karang Anyar, Lampung Selatan",
        lokasi: "Lampung Selatan, Lampung",
        listrik: "-",
        sertifikat: "SHM",
        hadap: "Selatan",
        group: "Secondary",
        furnish: "-",
        perMeter: "-",
        terdaftarPada: "-",
        idListing: "112025-SRP0004",
      },
      en: {
        transaction: "For Sale",
        bedrooms: "-",
        bathrooms: "-",
        landArea: "50,000 m²",
        propertyType: "Land",
        address: "Jl Raya Karang Anyar, South Lampung",
        location: "South Lampung, Lampung",
        electricity: "-",
        certificate: "Freehold (SHM)",
        facing: "South",
      },
    },

    gallery: ["/ImageKRG.png"],
  },

  {
    id: 5,
    title: {
      id: "Take Over Kredit Rumah Di Perumahan Natar Sejahtera",
      en: "House Loan Takeover in Natar Sejahtera Residence",
    },
    type: { id: "Rumah", en: "House" },

    location: "Lampung Selatan, Lampung",
    address: "Jl. Dahlia II, Kogop Natar",
    price: "Rp 45.000.000",
    perMeter: "-",
    img: "/ImageNTR.png",

    desc: {
      id: "Rumah siap huni dengan take over kredit di Perumahan Natar Sejahtera. KPR sudah berjalan 6 tahun dari jangka waktu 20 tahun. Angsuran Rp. 750.000/bulan.",
      en: "Move-in ready house with a mortgage takeover at Natar Sejahtera Residence. The mortgage has been running for 6 years out of a 20-year term. Monthly installment is Rp 750,000.",
    },

    premium: true,

    company: {
      name: "PT Nolan",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      website: "-",
    },

    consultant: {
      name: "Martin Simorangkir",
      phone: "+6282281415444",
      whatsapp: "+6282281415444",
      photo: "/Martin.jpg",
    },

    details: {
      id: {
        transaksi: "Jual",
        kamarTidur: "2",
        kamarMandi: "1",
        luasTanah: "77 m²",
        tipeProperti: "Rumah",
        alamat: "Jl. Dahlia II, Kogop Natar",
        lokasi: "Lampung Selatan, Lampung",
        listrik: "1.300 W",
        sertifikat: "SHM",
        hadap: "Selatan",
        group: "Primary",
        furnish: "Non Furnished",
        perMeter: "-",
        terdaftarPada: "-",
        idListing: "112025-TBT0005",
      },
      en: {
        transaction: "For Sale",
        bedrooms: "2",
        bathrooms: "1",
        landArea: "77 m²",
        propertyType: "House",
        address: "Jl. Dahlia II, Kogop Natar",
        location: "South Lampung, Lampung",
        electricity: "1,300 W",
        certificate: "Freehold (SHM)",
        facing: "South",
      },
    },
    gallery: ["/ImageNTR.png", "/ImageNTR2.png", "/ImageNTR3.png"],
  },
];

/* -----------------------------------------------
   FINAL: ADD SLUG (ID + EN)
----------------------------------------------- */
export const propertiesData = rawProperties.map((p) => ({
  ...p,
  slug: {
    id: `${p.id}-${slugify(p.title.id)}`,
    en: `${p.id}-${slugify(p.title.en)}`,
  },
}));
