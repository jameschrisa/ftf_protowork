export interface Flare {
  id: string;
  name: string;
  location: string;
}

export const flares: Flare[] = [
  { id: "FLR-001", name: "Main Process Flare", location: "North Plant" },
  { id: "FLR-002", name: "Emergency HP Flare", location: "South Plant" },
  { id: "FLR-003", name: "Low Pressure Flare", location: "East Complex" },
  { id: "FLR-004", name: "Acid Gas Flare", location: "West Plant" },
  { id: "FLR-005", name: "Storage Tank Flare", location: "Tank Farm" },
  { id: "FLR-006", name: "Marine Terminal Flare", location: "Port Facility" },
  { id: "FLR-007", name: "Backup Process Flare", location: "North Plant" },
  { id: "FLR-008", name: "Hydrocarbon Flare", location: "Process Unit 3" },
  { id: "FLR-009", name: "Auxiliary HP Flare", location: "South Plant" },
  { id: "FLR-010", name: "Emergency LP Flare", location: "East Complex" },
  { id: "FLR-011", name: "Waste Gas Flare", location: "Treatment Unit" },
  { id: "FLR-012", name: "Sulfur Unit Flare", location: "SRU Complex" },
  { id: "FLR-013", name: "Crude Unit Flare", location: "CDU Area" },
  { id: "FLR-014", name: "Reformer Flare", location: "CCR Unit" },
  { id: "FLR-015", name: "Alkylation Flare", location: "Alky Unit" },
  { id: "FLR-016", name: "Coker Flare", location: "DCU Area" },
  { id: "FLR-017", name: "FCCU Flare", location: "Cat Cracker" },
  { id: "FLR-018", name: "Hydrogen Plant Flare", location: "H2 Complex" },
  { id: "FLR-019", name: "Isomerization Flare", location: "Isom Unit" },
  { id: "FLR-020", name: "Aromatics Flare", location: "BTX Complex" },
  { id: "FLR-021", name: "Olefins Flare", location: "Ethylene Plant" },
  { id: "FLR-022", name: "Polyethylene Flare", location: "PE Plant" },
  { id: "FLR-023", name: "Terminal Loading Flare", location: "Loading Bay" },
]
