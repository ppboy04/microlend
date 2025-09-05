
import { create } from 'zustand';
import { User, Loan, UserRole, LoanPurpose, TrustScore } from '../types';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Theme
  isDarkMode: boolean;
  
  // Data
  loans: Loan[];
  
  // Actions
  login: (email: string, password: string, role: UserRole) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  toggleDarkMode: () => void;
  
  // Loan actions
  createLoan: (amount: number, duration: number, purpose: LoanPurpose, description: string) => void;
  fundLoan: (loanId: string, amount: number) => void;
  
  // Getters
  getBorrowerLoans: (borrowerId: string) => Loan[];
  getAvailableLoans: () => Loan[];
  getLenderInvestments: (lenderId: string) => Array<{ loan: Loan; amountFunded: number }>;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'borrower',
    trustScore: 'good',
    repaymentStreak: 12,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'lender',
    socialImpactScore: 850,
    badges: ['Community Helper 💎', 'Top Supporter 🏆'],
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
];

// Mock loans for demo
const mockLoans: Loan[] = [
  {
    id: '1',
    borrowerId: '1',
    borrowerName: 'Sarah Johnson',
    borrowerTrustScore: 'good',
    amount: 2500,
    fundedAmount: 1800,
    duration: 12,
    purpose: 'education',
    description: 'Need funding for online certification course in data science',
    status: 'in-progress',
    createdAt: new Date('2024-12-01'),
    funders: [
      {
        lenderId: '2',
        lenderName: 'Michael Chen',
        amount: 1800,
        fundedAt: new Date('2024-12-02')
      }
    ]
  }
];

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: null,
  isAuthenticated: false,
  isDarkMode: false,
  loans: mockLoans,
  
  // Auth actions
  login: (email: string, password: string, role: UserRole) => {
    const user = mockUsers.find(u => u.email === email && u.role === role);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  signup: (name: string, email: string, password: string, role: UserRole) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      ...(role === 'borrower' ? {
        trustScore: 'medium' as TrustScore,
        repaymentStreak: 0
      } : {
        socialImpactScore: 0,
        badges: []
      })
    };
    
    mockUsers.push(newUser);
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  
  toggleDarkMode: () => {
    set(state => ({ isDarkMode: !state.isDarkMode }));
  },
  
  // Loan actions
  createLoan: (amount: number, duration: number, purpose: LoanPurpose, description: string) => {
    const { currentUser, loans } = get();
    if (!currentUser || currentUser.role !== 'borrower') return;
    
    const newLoan: Loan = {
      id: Date.now().toString(),
      borrowerId: currentUser.id,
      borrowerName: currentUser.name,
      borrowerTrustScore: currentUser.trustScore || 'medium',
      amount,
      fundedAmount: 0,
      duration,
      purpose,
      description,
      status: 'pending',
      createdAt: new Date(),
      funders: []
    };
    
    set({ loans: [...loans, newLoan] });
  },
  
  fundLoan: (loanId: string, amount: number) => {
    const { currentUser, loans } = get();
    if (!currentUser || currentUser.role !== 'lender') return;
    
    const updatedLoans = loans.map(loan => {
      if (loan.id === loanId) {
        const newFundedAmount = loan.fundedAmount + amount;
        const newFunder = {
          lenderId: currentUser.id,
          lenderName: currentUser.name,
          amount,
          fundedAt: new Date()
        };
        
        return {
          ...loan,
          fundedAmount: newFundedAmount,
          status: newFundedAmount >= loan.amount ? 'in-progress' : 'pending',
          funders: [...loan.funders, newFunder]
        } as Loan;
      }
      return loan;
    });
    
    set({ loans: updatedLoans });
  },
  
  // Getters
  getBorrowerLoans: (borrowerId: string) => {
    return get().loans.filter(loan => loan.borrowerId === borrowerId);
  },
  
  getAvailableLoans: () => {
    return get().loans.filter(loan => loan.fundedAmount < loan.amount);
  },
  
  getLenderInvestments: (lenderId: string) => {
    const loans = get().loans;
    const investments: Array<{ loan: Loan; amountFunded: number }> = [];
    
    loans.forEach(loan => {
      const funder = loan.funders.find(f => f.lenderId === lenderId);
      if (funder) {
        investments.push({
          loan,
          amountFunded: funder.amount
        });
      }
    });
    
    return investments;
  }
}));
