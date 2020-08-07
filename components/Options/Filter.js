import React from 'react';
import OptionContext from '../OptionContext';
import OptionContainer from '../styles/OptionContainer';
import BtnGrey from '../styles/BtnGrey';
import OptionPopup from '../styles/OptionPopup';
import FormContainer from '../styles/FormContainer';
import { Select, FormInputSm } from '../styles/FormComponent';
import BtnGreySm from '../styles/BtnGreySm';
import BtnPrimary from '../styles/BtnPrimary';
import FilterAction from '../styles/FilterAction';
import { getFilterStr } from '../../utils';

const Filter = ({
  filter,
  singleFilter,
  setSingleFilter,
  fieldArr,
  setFilter,
  setFilterStr,
  children,
}) => {
  return (
    <OptionContext.Consumer>
      {(ctx) => (
        <OptionContainer
          onClick={(e) => {
            e.stopPropagation();
            ctx.setShowFreezeCol(false);
            ctx.setShowSort(false);
            ctx.setShowLimitField(false);
          }}
        >
          <BtnGrey onClick={() => ctx.setShowFilter(!ctx.showFilter)}>
            Filter <ion-icon name="filter-outline"></ion-icon>
          </BtnGrey>
          {ctx.showFilter && (
            <OptionPopup>
              {filter.map((item, i) => (
                <FormContainer key={i}>
                  <Select readOnly disabled>
                    <option value={item.field}>
                      {_.startCase(item.field)}
                    </option>
                  </Select>
                  <Select readOnly disabled>
                    <option value={item.operator}>{item.operator}</option>
                  </Select>
                  <FormInputSm
                    value={item.value}
                    readOnly
                    disabled
                  ></FormInputSm>
                </FormContainer>
              ))}
              <FormContainer>
                {/* <Select
                  onChange={(e) => {
                    setSingleFilter({
                      ...singleFilter,
                      field: e.target.value,
                    });
                  }}
                  defaultValue={singleFilter.field}
                  value={singleFilter.field}
                >
                  <option value="">Choose a field</option>
                  {fieldArr.map((field) => (
                    <option key={field} value={field}>
                      {_.startCase(field)}
                    </option>
                  ))}
                </Select>
                <Select
                  onChange={(e) => {
                    setSingleFilter({
                      ...singleFilter,
                      operator: e.target.value,
                    });
                  }}
                  value={singleFilter.operator}
                >
                  <option value="">Choose an operator</option>
                  <option value="gte">Greater than</option>
                  <option value="eq">Equal</option>
                  <option value="lte">Less than</option>
                </Select>
                <FormInputSm
                  type="text"
                  value={singleFilter.value}
                  onChange={(e) => {
                    setSingleFilter({
                      ...singleFilter,
                      value: e.target.value,
                    });
                  }}
                  placeHolder="value"
                />
                <BtnGreySm
                  onClick={(e) => {
                    e.preventDefault();
                    setFilter([...filter, singleFilter]);
                    setSingleFilter({
                      field: '',
                      operator: '',
                      value: '',
                    });
                  }}
                >
                  Add more field
                </BtnGreySm> */}
              </FormContainer>
              {children}
              {/* <FilterAction>
                <BtnPrimary
                  onClick={() => {
                    setFilterStr(getFilterStr(filter, singleFilter));
                    ctx.setShowFilter(false);
                  }}
                >
                  Filter
                </BtnPrimary>
                <BtnGrey
                  onClick={() => {
                    setFilterStr('');
                    setFilter([]);
                    ctx.setShowFilter(false);
                  }}
                >
                  Clear filter
                </BtnGrey>
              </FilterAction> */}
            </OptionPopup>
          )}
        </OptionContainer>
      )}
    </OptionContext.Consumer>
  );
};

export default Filter;
