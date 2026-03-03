const { mockDeep } = require("jest-mock-extended");

const mockPrisma = mockDeep();

jest.mock("../config/prisma", () => mockPrisma);

const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../dao/systemeJeu.dao");

const mockSystemeJeu = {
  id: 1,
  nom: "D&D 5e",
  description: "Donjons & Dragons 5ème édition",
  source: "https://dnd.com",
  auteur: { id: 1, nom: "Gygax", prenom: "Gary" },
};

describe("systemeJeu.dao", () => {
  afterEach(() => jest.clearAllMocks());

  test("findAll — retourne tous les systèmes de jeu", async () => {
    mockPrisma.systemeJeu.findMany.mockResolvedValue([mockSystemeJeu]);
    const result = await findAll();
    expect(result).toEqual([mockSystemeJeu]);
    expect(mockPrisma.systemeJeu.findMany).toHaveBeenCalledTimes(1);
  });

  test("findById — retourne un système de jeu par id", async () => {
    mockPrisma.systemeJeu.findUnique.mockResolvedValue(mockSystemeJeu);
    const result = await findById(1);
    expect(result).toEqual(mockSystemeJeu);
    expect(mockPrisma.systemeJeu.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  test("findById — retourne null si non trouvé", async () => {
    mockPrisma.systemeJeu.findUnique.mockResolvedValue(null);
    const result = await findById(999);
    expect(result).toBeNull();
  });

  test("create — crée un système de jeu", async () => {
    mockPrisma.systemeJeu.create.mockResolvedValue(mockSystemeJeu);
    const result = await create(mockSystemeJeu);
    expect(result).toEqual(mockSystemeJeu);
    expect(mockPrisma.systemeJeu.create).toHaveBeenCalledTimes(1);
  });

  test("update — met à jour un système de jeu", async () => {
    const updated = { ...mockSystemeJeu, nom: "Pathfinder" };
    mockPrisma.systemeJeu.update.mockResolvedValue(updated);
    const result = await update(1, { nom: "Pathfinder" });
    expect(result.nom).toBe("Pathfinder");
  });

  test("remove — supprime un système de jeu", async () => {
    mockPrisma.systemeJeu.delete.mockResolvedValue(mockSystemeJeu);
    const result = await remove(1);
    expect(result).toEqual(mockSystemeJeu);
    expect(mockPrisma.systemeJeu.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
