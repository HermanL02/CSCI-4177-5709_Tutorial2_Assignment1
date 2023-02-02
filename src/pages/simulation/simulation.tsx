import React, { useState } from 'react';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import AppBar from '@mui/material/AppBar';
import InputLabel from '@mui/material/InputLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ThemeTable = styled('table')({
      minWidth: 650,
});
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 140.32 },
  { symbol: 'GOOG', name: 'Alphabet Inc.', price: 2223.54 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 801.83 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3113.86 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 232.91 },
  { symbol: 'FB', name: 'Facebook, Inc.', price: 270.31 },
  { symbol: 'V', name: 'Visa Inc.', price: 221.75 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 160.30 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 157.47 },
  ];
const Portfolio = () => {
  
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(0);
  const [lastId,setLastId] = useState(6);
  const [purchasedStocks, setPurchasedStocks] = useState([
    { id: 1, symbol: 'AAPL', shares: 5, purchasePrice: 130.00, purchaseDate: '2022-01-01' },
    { id: 2, symbol: 'TSLA', shares: 2, purchasePrice: 700.00, purchaseDate: '2022-01-02' },
    { id: 3, symbol: 'GOOG', shares: 10, purchasePrice: 2000.00, purchaseDate: '2022-01-03' },
    { id: 4, symbol: 'AMZN', shares: 7, purchasePrice: 2800.00, purchaseDate: '2022-01-04' },
    { id: 5, symbol: 'MSFT', shares: 3, purchasePrice: 220.00, purchaseDate: '2022-01-05' },
    { id: 6, symbol: 'FB', shares: 20, purchasePrice: 220.00, purchaseDate: '2022-01-06' }
    ]);
  const [netProfitLoss, setNetProfitLoss] = useState(0);
  const [pastProfitLoss, setPastProfitLoss]  = useState(0);
  
  const updateNetProfitLoss = () => {
    let net = 0;
    purchasedStocks.forEach(stock => {
      const stockInfo = stocks.find(s => s.symbol === stock.symbol);
      if(stockInfo!=undefined){
        net += (stockInfo.price - stock.purchasePrice) * stock.shares;
      }
    });
    setNetProfitLoss(net);
    
  };
  const updatePastProfitLoss = (e) => {
    let past = pastProfitLoss+e;
    setPastProfitLoss(past);
  }
  const handleStockSelection = (e) => {
    setSelectedStock(e.target.value);
  };

  const handleSharesChange = (e) => {
    setShares(e.target.value);
  };

  const handleStockPurchase = () => {
    if (!selectedStock || !shares) {
      return;
    }
    let r = lastId + 1;
    setLastId(lastId+1);
    const newStock = {
      id: r,
      symbol: selectedStock,
      shares: shares, 
      purchasePrice: stocks.find(s => s.symbol === selectedStock).price,
      purchaseDate: new Date().toISOString().substring(0, 10)
    };
    setPurchasedStocks([...purchasedStocks, newStock]);
    setShares(0);
    setSelectedStock(null);
    updateNetProfitLoss();
  };
  
  const handleStockSell = stockToSell => {
    
    setPurchasedStocks(
      purchasedStocks.filter(
        stock => stock.id !== stockToSell.id
      )
    );
    let lossEarn = (stocks.find(s => s.symbol === stockToSell.symbol).price-stockToSell.purchasePrice ) * stockToSell.shares;
    updatePastProfitLoss(lossEarn);
    updateNetProfitLoss();

  };

  return (
    <ThemeProvider theme={darkTheme}>
<div style={{padding: 20 }}>
<Typography variant="h2">Investment Simulation</Typography>
<div>
  <Typography variant="h3">Past Profit/Loss: <span style={{ color: pastProfitLoss > 0 ? 'red' : pastProfitLoss < 0 ? 'green' : 'white' }}>${pastProfitLoss.toFixed(2)}</span></Typography>
</div>
<div>
  <Typography variant="h3">Net Profit/Loss: <span style={{ color: netProfitLoss > 0 ? 'red' : netProfitLoss < 0 ? 'green' : 'white' }}>${netProfitLoss.toFixed(2)}</span></Typography>
</div>

</div>


    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:50}}>
      <AppBar></AppBar>
      <Table sx={{border:1}}>
        <TableHead>
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>Profit/Loss</TableCell>
            <TableCell>Purchase Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchasedStocks.map((stock) => {
            const stockInfo = stocks.find(s => s.symbol === stock.symbol);
            return (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.id}</TableCell>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stockInfo.name}</TableCell>
                <TableCell>{stock.shares}</TableCell>
                <TableCell>${stock.purchasePrice}</TableCell>
                <TableCell>${stockInfo.price}</TableCell>
                <TableCell>${(stockInfo.price - stock.purchasePrice) * stock.shares}</TableCell>
                <TableCell>{stock.purchaseDate}</TableCell>
                <TableCell>
                  <Button onClick={() => handleStockSell(stock)}>
                  Sell
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:50}}>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel id="demo-simple-select-label">Stock name</InputLabel>
        <Select 
          value={selectedStock} 
          onChange={handleStockSelection} 
          label="Stock name"
        >
          {stocks.map(stock => (
            <MenuItem key={stock.symbol} value={stock.symbol}>
              {stock.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <TextField
          label="Shares"
          type="number"
          value={shares}
          onChange={handleSharesChange}
          variant="outlined"
        />
        <br />
        <br />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleStockPurchase}
        >
          Purchase
        </Button>
      </FormControl>
      </div>
 
      </div>
      </ThemeProvider>
);

};

export default Portfolio;
