import AuthRepository from './repositories/AuthRepository';
import ConstantRepository from './repositories/ConstantRepository';

const authRepo = new AuthRepository();
const constantRepo = new ConstantRepository();

export { authRepo, constantRepo };
