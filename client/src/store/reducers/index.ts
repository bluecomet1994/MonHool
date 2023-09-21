import currency from "./currency.reducer";
import staking from "./staking.reducer";
import user from "./user.reducer";
import transaction from "./transaction.reducer";
import trading from "./trading.reducer";
import admin from "./admin.reducer";

const reducers = {
  user,
  currency,
  transaction,
  staking,
  trading,
  admin
}

export default reducers;