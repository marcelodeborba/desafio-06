import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    // Validando o tipo de transação
    if (!['income', 'outcome'].includes(type)){
      throw new Error('Este tipo de transação não é válida!');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === "outcome" && total < value){
      throw new Error('Eu não tenho saldo suficiente para este saque');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
