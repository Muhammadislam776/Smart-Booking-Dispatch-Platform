export interface TradePart {
  id: string;
  category: 'plumbing' | 'electrical' | 'locksmith' | 'hvac';
  name: string;
  supplier: 'Screwfix UK' | 'Toolstation' | 'Plumbase' | 'CEF Electrical';
  partNumber: string;
  price: number;
  stock: number;
  image: string;
}

export const mockUKTradeParts: TradePart[] = [
  {
    id: 'prt_101',
    category: 'plumbing',
    name: 'Worcester Bosch Greenstar Diverter Valve Assembly',
    supplier: 'Plumbase',
    partNumber: 'PLM-WB-87161068450',
    price: 84.50,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'prt_102',
    category: 'plumbing',
    name: 'Grundfos UPS3 15-50/65 Central Heating Circulator Pump',
    supplier: 'Screwfix UK',
    partNumber: 'SFX-74921',
    price: 129.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'prt_103',
    category: 'electrical',
    name: 'Hager Design 10 10-Way Dual RCD Consumer Unit Board',
    supplier: 'CEF Electrical',
    partNumber: 'CEF-HAG-JK110',
    price: 115.00,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'prt_104',
    category: 'electrical',
    name: 'MK Electric 32A Type B Single Pole MCB Breaker',
    supplier: 'Toolstation',
    partNumber: 'TLS-48210',
    price: 6.80,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'prt_105',
    category: 'locksmith',
    name: 'Ultion 3-Star High Security Anti-Snap Euro Cylinder (35/35)',
    supplier: 'Screwfix UK',
    partNumber: 'SFX-ULT-3535',
    price: 52.50,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'prt_106',
    category: 'hvac',
    name: 'Honeywell Home T6 Smart Programmable Thermostat',
    supplier: 'Toolstation',
    partNumber: 'TLS-HON-T6',
    price: 145.00,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=200&auto=format&fit=crop',
  },
];
