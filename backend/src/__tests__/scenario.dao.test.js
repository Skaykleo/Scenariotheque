const { mockDeep } = require("jest-mock-extended");

const mockPrisma = mockDeep();

jest.mock("../config/prisma", () => mockPrisma);

const {
  findAll,
  findById,
  create,
  update,
  remove,
  findByFiltres,
} = require("../dao/scenario.dao");

const mockScenario = {
  id: 1,
  titre: "La Montagne des Sorciers",
  description: "Un scénario épique",
  anneePublication: new Date("2020-01-01"),
  type: "LIVRE",
  source: "https://example.com",
  auteur: { id: 1, nom: "Doe", prenom: "John" },
  genre: { id: 1, nom: "Fantasy", description: "Heroic Fantasy" },
  systemeJeu: {
    id: 1,
    nom: "D&D 5e",
    description: "Donjons & Dragons",
    source: "https://dnd.com",
  },
};

describe("scenario.dao", () => {
  afterEach(() => jest.clearAllMocks());

  test("findAll — retourne tous les scénarios", async () => {
    mockPrisma.scenario.findMany.mockResolvedValue([mockScenario]);
    const result = await findAll();
    expect(result).toEqual([mockScenario]);
    expect(mockPrisma.scenario.findMany).toHaveBeenCalledTimes(1);
  });

  test("findById — retourne un scénario par id", async () => {
    mockPrisma.scenario.findUnique.mockResolvedValue(mockScenario);
    const result = await findById(1);
    expect(result).toEqual(mockScenario);
    expect(mockPrisma.scenario.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  test("findById — retourne null si non trouvé", async () => {
    mockPrisma.scenario.findUnique.mockResolvedValue(null);
    const result = await findById(999);
    expect(result).toBeNull();
  });

  test("findByFiltres — filtre par genreId", async () => {
    mockPrisma.scenario.findMany.mockResolvedValue([mockScenario]);
    const result = await findByFiltres({ genreId: 1 });
    expect(result).toEqual([mockScenario]);
    expect(mockPrisma.scenario.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ genreId: 1 }),
      }),
    );
  });

  test("create — crée un scénario", async () => {
    mockPrisma.scenario.create.mockResolvedValue(mockScenario);
    const result = await create(mockScenario);
    expect(result).toEqual(mockScenario);
    expect(mockPrisma.scenario.create).toHaveBeenCalledTimes(1);
  });

  test("update — met à jour un scénario", async () => {
    const updated = { ...mockScenario, titre: "Nouveau titre" };
    mockPrisma.scenario.update.mockResolvedValue(updated);
    const result = await update(1, { titre: "Nouveau titre" });
    expect(result.titre).toBe("Nouveau titre");
  });

  test("remove — supprime un scénario", async () => {
    mockPrisma.scenario.delete.mockResolvedValue(mockScenario);
    const result = await remove(1);
    expect(result).toEqual(mockScenario);
    expect(mockPrisma.scenario.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
