import Session from "../models/clinicSession";

const createSession = async (sessionData: any) => {
  console.log("Creating session with data:", sessionData);
  return await Session.create(sessionData);
};

const getAllSessions = async () => {
  return await Session.findAll({ include: ["Clinic"] });
};

const getSessionById = async (id: number) => {
  return await Session.findByPk(id);
};

const updateSession = async (id: number, updates: any) => {
  const session = await Session.findByPk(id);
  if (!session) return null;
  return await session.update(updates);
};

const deleteSession = async (id: number) => {
  const session = await Session.findByPk(id);
  if (!session) return null;
  await session.destroy();
  return session;
};
const findAll = async (options = {}) => {
  return Session.findAll(options);
};

export default {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  findAll,
};
