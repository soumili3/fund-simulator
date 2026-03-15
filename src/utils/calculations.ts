export interface SIPResult {
  totalInvested: number;
  estimatedReturns: number;
  projectedValue: number;
  inflationAdjustedValue?: number;
  chartData: {
    year: number;
    invested: number;
    totalValue: number;
    inflationAdjustedValue?: number;
    annualReturnEarned?: number;
  }[];
}

export const calculateSIP = (
  monthlyInvestment: number,
  annualReturnRate: number,
  years: number,
  adjustForInflation: boolean = false,
  inflationRate: number = 6
): SIPResult => {
  const monthlyRate = annualReturnRate / 12 / 100;
  const months = years * 12;
  
  // SIP Future Value Formula: P * [((1 + i)^n - 1) / i] * (1 + i)
  const projectedValue = 
    monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate);
    
  const totalInvested = monthlyInvestment * months;
  const estimatedReturns = projectedValue - totalInvested;
  
  const chartData = [];
  let previousTotalValue = 0;
  
  for (let y = 0; y <= years; y++) {
    const m = y * 12;
    if (m === 0) {
      chartData.push({ year: 0, invested: 0, totalValue: 0, inflationAdjustedValue: 0, annualReturnEarned: 0 });
      continue;
    }
    
    const currentProjectedValue = 
      monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * 
      (1 + monthlyRate);
      
    const currentInvested = monthlyInvestment * m;
    const currentTotalValue = Math.round(currentProjectedValue);
    
    // Annual return earned = Current Total Value - Previous Total Value - (Monthly Investment * 12)
    const annualReturnEarned = y > 0 ? currentTotalValue - previousTotalValue - (monthlyInvestment * 12) : 0;
    previousTotalValue = currentTotalValue;

    let currentInflationAdjustedValue;
    if (adjustForInflation) {
      currentInflationAdjustedValue = Math.round(currentProjectedValue / Math.pow(1 + (inflationRate / 100), y));
    }
      
    chartData.push({
      year: y,
      invested: currentInvested,
      totalValue: currentTotalValue,
      inflationAdjustedValue: currentInflationAdjustedValue,
      annualReturnEarned: Math.round(annualReturnEarned),
    });
  }

  let inflationAdjustedValue;
  if (adjustForInflation) {
    // Real Value = Nominal Value / (1 + inflationRate)^years
    inflationAdjustedValue = projectedValue / Math.pow(1 + (inflationRate / 100), years);
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    projectedValue: Math.round(projectedValue),
    inflationAdjustedValue: inflationAdjustedValue ? Math.round(inflationAdjustedValue) : undefined,
    chartData,
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-IN').format(value);
};
