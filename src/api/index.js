import AuthRepository from './repositories/AuthRepository';
import ConstantRepository from './repositories/ConstantRepository';
import TransactionRepository from './repositories/TransactionRepository';

const authRepo = new AuthRepository();
const constantRepo = new ConstantRepository();
const transactionRepo = new TransactionRepository();

export { authRepo, constantRepo, transactionRepo };
