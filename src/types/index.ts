
export type UserRole = 'borrower' | 'lender';

export type TrustScore = 'good' | 'medium' | 'high-risk';

export type LoanPurpose = 'education' | 'medical' | 'business' | 'personal';

export type LoanStatus = 'pending' | 'in-progress' | 'completed' | 'defaulted';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  trustScore?: TrustScore;
  repaymentStreak?: number;
  socialImpactScore?: number;
  badges?: string[];
  avatar?: string;
}

export interface Loan {
  id: string;
  borrowerId: string;
  borrowerName: string;
  borrowerTrustScore: TrustScore;
  amount: number;
  fundedAmount: number;
  duration: number;
  purpose: LoanPurpose;
  description: string;
  status: LoanStatus;
  createdAt: Date;
  funders: Array<{
    lenderId: string;
    lenderName: string;
    amount: number;
    fundedAt: Date;
  }>;
}

export interface Investment {
  id: string;
  loanId: string;
  borrowerName: string;
  amount: number;
  purpose: LoanPurpose;
  status: LoanStatus;
  fundedAt: Date;
}
