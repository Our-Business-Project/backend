import BaseRepository from "./base.repository.js";

class CalcRepository extends BaseRepository {
  constructor() {
    super("savedCalcData");
  }

  async findFolder(userId, folderId) {
    const data = await calcRepository.findOne({ _id: userId });

    return data
      ? data.folders.find((folder) => folder._id.equals(folderId))
      : null;
  }
}

const calcRepository = new CalcRepository();
export { calcRepository };
