import React from 'react';
import OptionContext from '../OptionContext';
import OptionContainer from '../styles/OptionContainer';
import BtnGrey from '../styles/BtnGrey';
import OptionPopup from '../styles/OptionPopup';
import FormContainer from '../styles/FormContainer';
import { Select } from '../styles/FormComponent';
import BtnPrimary from '../styles/BtnPrimary';

const Sort = ({ setSortStr, sort, setSort, fieldArr }) => {
  return (
    <OptionContext.Consumer>
      {(ctx) => (
        <OptionContainer
          onClick={(e) => {
            e.stopPropagation();
            ctx.setShowFreezeCol(false);
            ctx.setShowFilter(false);
            ctx.setShowLimitField(false);
          }}
        >
          <BtnGrey onClick={() => ctx.setShowSort(!ctx.showSort)}>
            Sort <ion-icon name="funnel-outline"></ion-icon>
          </BtnGrey>
          {ctx.showSort && (
            <OptionPopup>
              <FormContainer
                style={{ width: '35rem' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSortStr(
                    `${sort.orderBy === 'asc' ? '' : '-'}${sort.sortBy}`
                  );
                  ctx.setShowSort(false);
                }}
              >
                <Select
                  onChange={(e) => setSort({ ...sort, sortBy: e.target.value })}
                  defaultValue={sort.sortBy}
                >
                  {fieldArr.map((field) => (
                    <option key={field} value={field}>
                      {_.startCase(field)}
                    </option>
                  ))}
                </Select>
                <Select
                  onChange={(e) =>
                    setSort({ ...sort, orderBy: e.target.value })
                  }
                  defaultValue={sort.orderBy}
                >
                  <option value="asc">asc</option>
                  <option value="desc">desc</option>
                </Select>
                <BtnPrimary>Sort</BtnPrimary>
              </FormContainer>
            </OptionPopup>
          )}
        </OptionContainer>
      )}
    </OptionContext.Consumer>
  );
};

export default Sort;
