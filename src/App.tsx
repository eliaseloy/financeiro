import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter';
import { useEffect, useState } from "react";

import { Category } from './types/Category';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';
import { Item } from './types/Item';
import {ResumeItem} from './components/ResumeItem'
import { TableArea } from "./components/TableArea";
import { categories } from './data/categories';
import { items } from './data/items';
import styled from "styled-components";

const App = () => {

  const [list, setList] = useState(items);
  const [currentMonth, setCurrentMounth] = useState(getCurrentMonth());
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMounth(newMonth)
  };

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return (
    <Container>
      <Header>
        <HeaderText>
          Sistema Financeiro
        </HeaderText>
      </Header>
      <Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea list={filteredList} />
      </Body>
    </Container>
  );
}

export default App;

const Container = styled.div``

const Header = styled.div`
  background-color: darkblue;
  height: 150px;
  text-align: center;
`

const HeaderText = styled.h1`
  margin: 0;
  padding: 0;
  color: #FFF;
  padding-top: 30px;
`

const Body = styled.div`
  margin: auto;
  max-width: 980px;
  margin-bottom: 50px;
`
