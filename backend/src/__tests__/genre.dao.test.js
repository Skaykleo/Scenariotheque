const { mockDeep } = require("jest-mock-extended");

const mockPrisma = mockDeep();

jest.mock("../config/prisma", () => mockPrisma);

const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../dao/genre.dao");

const mockGenre = {
  id: 1,
  nom: "Fantasy",
  description: "Heroic Fantasy",
};

describe("genre.dao", () => {
  afterEach(() => jest.clearAllMocks());

  test("findAll — retourne tous les genres", async () => {
    mockPrisma.genre.findMany.mockResolvedValue([mockGenre]);
    const result = await findAll();
    expect(result).toEqual([mockGenre]);
    expect(mockPrisma.genre.findMany).toHaveBeenCalledTimes(1);
  });

  test("findById — retourne un genre par id", async () => {
    mockPrisma.genre.findUnique.mockResolvedValue(mockGenre);
    const result = await findById(1);
    expect(result).toEqual(mockGenre);
    expect(mockPrisma.genre.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  test("findById — retourne null si non trouvé", async () => {
    mockPrisma.genre.findUnique.mockResolvedValue(null);
    const result = await findById(999);
    expect(result).toBeNull();
  });

  test("create — crée un genre", async () => {
    mockPrisma.genre.create.mockResolvedValue(mockGenre);
    const result = await create(mockGenre);
    expect(result).toEqual(mockGenre);
    expect(mockPrisma.genre.create).toHaveBeenCalledTimes(1);
  });

  test("update — met à jour un genre", async () => {
    const updated = { ...mockGenre, nom: "Science-Fiction" };
    mockPrisma.genre.update.mockResolvedValue(updated);
    const result = await update(1, { nom: "Science-Fiction" });
    expect(result.nom).toBe("Science-Fiction");
  });

  test("remove — supprime un genre", async () => {
    mockPrisma.genre.delete.mockResolvedValue(mockGenre);
    const result = await remove(1);
    expect(result).toEqual(mockGenre);
    expect(mockPrisma.genre.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
