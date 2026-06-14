export const gyms = [
  {
    id: 1,
    name: "FitZone Cocody",
    location: "Cocody, Abidjan",
    capacity: 50,
    available: 35,
    image: "https://readdy.ai/api/search-image?query=modern%20luxury%20fitness%20gym%20interior%20with%20high-end%20equipment%2C%20bright%20lighting%2C%20clean%20minimalist%20design%2C%20treadmills%20and%20weight%20machines%2C%20professional%20athletic%20facility%2C%20contemporary%20architecture%2C%20spacious%20open%20layout&width=800&height=600&seq=gym1&orientation=landscape"
  },
  {
    id: 2,
    name: "PowerGym Plateau",
    location: "Plateau, Abidjan",
    capacity: 40,
    available: 28,
    image: "https://readdy.ai/api/search-image?query=premium%20fitness%20center%20interior%20with%20modern%20equipment%2C%20professional%20gym%20atmosphere%2C%20strength%20training%20area%2C%20cardio%20machines%2C%20bright%20ambient%20lighting%2C%20clean%20contemporary%20design&width=800&height=600&seq=gym2&orientation=landscape"
  },
  {
    id: 3,
    name: "Elite Fitness Marcory",
    location: "Marcory, Abidjan",
    capacity: 60,
    available: 42,
    image: "https://readdy.ai/api/search-image?query=upscale%20gym%20facility%20interior%2C%20state-of-the-art%20fitness%20equipment%2C%20spacious%20workout%20area%2C%20modern%20athletic%20center%2C%20professional%20lighting%2C%20clean%20minimalist%20aesthetic&width=800&height=600&seq=gym3&orientation=landscape"
  },
  {
    id: 4,
    name: "BodyShape Yopougon",
    location: "Yopougon, Abidjan",
    capacity: 45,
    available: 30,
    image: "https://readdy.ai/api/search-image?query=contemporary%20fitness%20gym%20interior%2C%20modern%20workout%20equipment%2C%20professional%20training%20facility%2C%20bright%20clean%20space%2C%20athletic%20center%20design%2C%20minimalist%20architecture&width=800&height=600&seq=gym4&orientation=landscape"
  }
];

export const reservations = [
  {
    id: "RES001",
    clientName: "Kouassi Jean",
    gymName: "FitZone Cocody",
    date: "2025-01-15",
    time: "08:00 - 10:00",
    status: "confirmé",
    amount: 5000
  },
  {
    id: "RES002",
    clientName: "Diabaté Marie",
    gymName: "PowerGym Plateau",
    date: "2025-01-15",
    time: "10:00 - 12:00",
    status: "confirmé",
    amount: 5000
  },
  {
    id: "RES003",
    clientName: "Traoré Ibrahim",
    gymName: "Elite Fitness Marcory",
    date: "2025-01-16",
    time: "14:00 - 16:00",
    status: "en attente",
    amount: 5000
  },
  {
    id: "RES004",
    clientName: "Koné Fatou",
    gymName: "BodyShape Yopougon",
    date: "2025-01-16",
    time: "18:00 - 20:00",
    status: "confirmé",
    amount: 5000
  },
  {
    id: "RES005",
    clientName: "Bamba Seydou",
    gymName: "FitZone Cocody",
    date: "2025-01-17",
    time: "06:00 - 08:00",
    status: "annulé",
    amount: 5000
  }
];

export const subscriptions = [
  {
    id: "SUB001",
    clientName: "Kouassi Jean",
    plan: "Premium",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "actif",
    amount: 150000,
    gym: "FitZone Cocody"
  },
  {
    id: "SUB002",
    clientName: "Diabaté Marie",
    plan: "Standard",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    status: "actif",
    amount: 75000,
    gym: "PowerGym Plateau"
  },
  {
    id: "SUB003",
    clientName: "Traoré Ibrahim",
    plan: "Basic",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "actif",
    amount: 35000,
    gym: "Elite Fitness Marcory"
  },
  {
    id: "SUB004",
    clientName: "Koné Fatou",
    plan: "Premium",
    startDate: "2024-12-01",
    endDate: "2025-11-30",
    status: "actif",
    amount: 150000,
    gym: "BodyShape Yopougon"
  },
  {
    id: "SUB005",
    clientName: "Bamba Seydou",
    plan: "Standard",
    startDate: "2024-11-01",
    endDate: "2025-01-10",
    status: "expiré",
    amount: 75000,
    gym: "FitZone Cocody"
  }
];

export const payments = [
  {
    id: "PAY001",
    clientName: "Kouassi Jean",
    amount: 150000,
    method: "Orange Money",
    date: "2025-01-01",
    status: "complété",
    type: "Abonnement"
  },
  {
    id: "PAY002",
    clientName: "Diabaté Marie",
    amount: 75000,
    method: "MTN Mobile Money",
    date: "2025-01-01",
    status: "complété",
    type: "Abonnement"
  },
  {
    id: "PAY003",
    clientName: "Traoré Ibrahim",
    amount: 5000,
    method: "Wave",
    date: "2025-01-10",
    status: "complété",
    type: "Réservation"
  },
  {
    id: "PAY004",
    clientName: "Koné Fatou",
    amount: 5000,
    method: "Orange Money",
    date: "2025-01-12",
    status: "en attente",
    type: "Réservation"
  },
  {
    id: "PAY005",
    clientName: "Bamba Seydou",
    amount: 35000,
    method: "MTN Mobile Money",
    date: "2025-01-13",
    status: "échoué",
    type: "Abonnement"
  }
];

export const financialStats = {
  totalRevenue: 420000,
  monthlyRevenue: 85000,
  activeSubscriptions: 124,
  pendingPayments: 15000,
  revenueByMonth: [
    { month: "Jan", revenue: 85000 },
    { month: "Fév", revenue: 92000 },
    { month: "Mar", revenue: 78000 },
    { month: "Avr", revenue: 95000 },
    { month: "Mai", revenue: 88000 },
    { month: "Juin", revenue: 82000 }
  ],
  revenueByGym: [
    { name: "FitZone Cocody", value: 125000 },
    { name: "PowerGym Plateau", value: 98000 },
    { name: "Elite Fitness Marcory", value: 110000 },
    { name: "BodyShape Yopougon", value: 87000 }
  ]
};