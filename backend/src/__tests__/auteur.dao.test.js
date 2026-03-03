const { mockDeep } = require("jest-mock-extended");

const mockPrisma = mockDeep();

jest.mock("../config/prisma", () => mockPrisma);

const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../dao/auteur.dao");

const mockAuteur = {
  id: 1,
  nom: "Gygax",
  prenom: "Gary",
};

describe("auteur.dao", () => {
  afterEach(() => jest.clearAllMocks());

  test("findAll — retourne tous les auteurs", async () => {
    mockPrisma.auteur.findMany.mockResolvedValue([mockAuteur]);
    const result = await findAll();
    expect(result).toEqual([mockAuteur]);
    expect(mockPrisma.auteur.findMany).toHaveBeenCalledTimes(1);
  });

  test("findById — retourne un auteur par id", async () => {
    mockPrisma.auteur.findUnique.mockResolvedValue(mockAuteur);
    const result = await findById(1);
    expect(result).toEqual(mockAuteur);
    expect(mockPrisma.auteur.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  test("findById — retourne null si non trouvé", async () => {
    mockPrisma.auteur.findUnique.mockResolvedValue(null);
    const result = await findById(999);
    expect(result).toBeNull();
  });

  test("create — crée un auteur", async () => {
    mockPrisma.auteur.create.mockResolvedValue(mockAuteur);
    const result = await create(mockAuteur);
    expect(result).toEqual(mockAuteur);
    expect(mockPrisma.auteur.create).toHaveBeenCalledTimes(1);
  });

  test("update — met à jour un auteur", async () => {
    const updated = { ...mockAuteur, nom: "Arneson" };
    mockPrisma.auteur.update.mockResolvedValue(updated);
    const result = await update(1, { nom: "Arneson" });
    expect(result.nom).toBe("Arneson");
  });

  test("remove — supprime un auteur", async () => {
    mockPrisma.auteur.delete.mockResolvedValue(mockAuteur);
    const result = await remove(1);
    expect(result).toEqual(mockAuteur);
    expect(mockPrisma.auteur.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
