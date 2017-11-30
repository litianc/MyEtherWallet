import React from 'react';
import { getTransactionFields, transaction } from 'libs/transaction';
import {
  SerializedTransaction,
  GetTransactionMetaFields
} from 'components/renderCbs';
import { Aux } from 'components/ui';
import ERC20 from 'libs/erc20';
import { From } from '../From';

//got duplication here

export const Addresses: React.SFC<{}> = () => (
  <SerializedTransaction
    withSerializedTransaction={serializedTransaction => {
      const transactionInstance = transaction(serializedTransaction);
      const { to, data } = getTransactionFields(transactionInstance);

      return (
        <Aux>
          <li className="ConfModal-details-detail">
            You are sending from <From withFrom={from => <code>{from}</code>} />
          </li>

          <li className="ConfModal-details-detail">
            You are sending to{' '}
            <code>
              <GetTransactionMetaFields
                withFieldValues={({ unit }) =>
                  unit === 'ether' ? to : ERC20.transfer.decodeInput(data)._to
                }
              />
            </code>
          </li>
        </Aux>
      );
    }}
  />
);
