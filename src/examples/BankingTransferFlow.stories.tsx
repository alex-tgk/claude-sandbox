import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../components/atoms/button/Button';
import { Input } from '../components/atoms/input/Input';
import { Select } from '../components/molecules/select/Select';
import { Badge } from '../components/atoms/badge/Badge';
import { Card, CardHeader, CardBody, CardFooter } from '../components/organisms/card/Card';
import { Alert } from '../components/molecules/alert/Alert';

const meta = {
  title: 'Examples/Banking Transfer Flow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete multi-step banking transfer application showcasing real-world usage of the component library.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: 'checking' | 'savings';
}

const mockAccounts: Account[] = [
  { id: '1', name: 'Primary Checking', accountNumber: '****1234', balance: 12450.75, type: 'checking' },
  { id: '2', name: 'Savings Account', accountNumber: '****5678', balance: 45230.00, type: 'savings' },
  { id: '3', name: 'Business Checking', accountNumber: '****9012', balance: 8920.50, type: 'checking' },
];

interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
}

const mockBeneficiaries: Beneficiary[] = [
  { id: '1', name: 'John Smith', accountNumber: '****4567', bank: 'Chase Bank' },
  { id: '2', name: 'Sarah Johnson', accountNumber: '****8901', bank: 'Bank of America' },
  { id: '3', name: 'Michael Brown', accountNumber: '****2345', bank: 'Wells Fargo' },
];

// Transfer state
interface TransferData {
  fromAccount: string;
  toAccount: string;
  amount: string;
  memo: string;
  schedule: 'immediate' | 'scheduled';
  scheduledDate?: string;
}

// Multi-step banking app
const BankingTransferApp = () => {
  const [step, setStep] = useState(1);
  const [transferData, setTransferData] = useState<TransferData>({
    fromAccount: '',
    toAccount: '',
    amount: '',
    memo: '',
    schedule: 'immediate',
    scheduledDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [transactionId, setTransactionId] = useState('');

  const totalSteps = 4;

  // Validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!transferData.fromAccount) newErrors.fromAccount = 'Please select a source account';
      if (!transferData.toAccount) newErrors.toAccount = 'Please select a recipient';
    }

    if (currentStep === 2) {
      if (!transferData.amount) {
        newErrors.amount = 'Amount is required';
      } else {
        const amount = parseFloat(transferData.amount);
        if (isNaN(amount) || amount <= 0) {
          newErrors.amount = 'Please enter a valid amount';
        } else {
          const fromAccount = mockAccounts.find(a => a.id === transferData.fromAccount);
          if (fromAccount && amount > fromAccount.balance) {
            newErrors.amount = 'Insufficient funds';
          }
        }
      }
      if (transferData.schedule === 'scheduled' && !transferData.scheduledDate) {
        newErrors.scheduledDate = 'Please select a date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 3) {
        // Submit transaction
        setTransactionId(`TXN${Date.now()}`);
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleReset = () => {
    setStep(1);
    setTransferData({
      fromAccount: '',
      toAccount: '',
      amount: '',
      memo: '',
      schedule: 'immediate',
      scheduledDate: '',
    });
    setErrors({});
    setTransactionId('');
  };

  const fromAccount = mockAccounts.find(a => a.id === transferData.fromAccount);
  const toAccount = mockBeneficiaries.find(b => b.id === transferData.toAccount);

  return (
    <div className="min-h-screen bg-layer-01 py-8">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-text-primary">Transfer Money</h1>
          <p className="mt-2 text-text-secondary">
            Send money to your beneficiaries securely
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Account', 'Details', 'Review', 'Complete'].map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isCompleted = stepNumber < step;

              return (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-none border-2 font-medium transition-all duration-110 ${
                        isActive
                          ? 'border-interactive bg-interactive text-text-on-color'
                          : isCompleted
                          ? 'border-success bg-success text-text-on-color'
                          : 'border-border-subtle bg-layer-02 text-text-secondary'
                      }`}
                    >
                      {isCompleted ? '✓' : stepNumber}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        isActive ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`mx-4 h-0.5 flex-1 transition-all duration-110 ${
                        isCompleted ? 'bg-success' : 'bg-border-subtle'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardBody>
            {/* Step 1: Select Accounts */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-text-primary">
                  Select Accounts
                </h2>

                <div className="space-y-4">
                  {/* From Account */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-primary">
                      From Account
                    </label>
                    <div className="grid gap-3">
                      {mockAccounts.map((account) => (
                        <button
                          key={account.id}
                          onClick={() =>
                            setTransferData({ ...transferData, fromAccount: account.id })
                          }
                          className={`rounded-none border p-4 text-left transition-all duration-110 ${
                            transferData.fromAccount === account.id
                              ? 'border-interactive bg-brand-10'
                              : 'border-border-subtle hover:border-border-strong'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-text-primary">
                                {account.name}
                              </div>
                              <div className="text-sm text-text-secondary">
                                {account.accountNumber}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-medium text-text-primary">
                                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </div>
                              <Badge
                                variant={account.type === 'checking' ? 'info' : 'success'}
                                size="sm"
                              >
                                {account.type}
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.fromAccount && (
                      <p className="mt-1 text-sm text-text-error">{errors.fromAccount}</p>
                    )}
                  </div>

                  {/* To Account */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-primary">
                      To Beneficiary
                    </label>
                    <Select
                      options={mockBeneficiaries.map(b => ({ value: b.id, label: `${b.name} - ${b.accountNumber}` }))}
                      value={transferData.toAccount}
                      onChange={(value) =>
                        setTransferData({ ...transferData, toAccount: value as string })
                      }
                      placeholder="Select beneficiary..."
                    />
                    {errors.toAccount && (
                      <p className="mt-1 text-sm text-text-error">{errors.toAccount}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Transfer Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-text-primary">
                  Transfer Details
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Amount (USD)"
                    type="number"
                    step="0.01"
                    value={transferData.amount}
                    onChange={(e) =>
                      setTransferData({ ...transferData, amount: e.target.value })
                    }
                    error={errors.amount}
                    isFullWidth
                    placeholder="0.00"
                  />

                  <Input
                    label="Memo (Optional)"
                    value={transferData.memo}
                    onChange={(e) =>
                      setTransferData({ ...transferData, memo: e.target.value })
                    }
                    isFullWidth
                    placeholder="Add a note..."
                  />

                  {/* Schedule */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-primary">
                      When to send
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() =>
                          setTransferData({ ...transferData, schedule: 'immediate' })
                        }
                        className={`w-full rounded-none border p-3 text-left transition-all duration-110 ${
                          transferData.schedule === 'immediate'
                            ? 'border-interactive bg-brand-10'
                            : 'border-border-subtle hover:border-border-strong'
                        }`}
                      >
                        <div className="font-medium text-text-primary">
                          Send Immediately
                        </div>
                        <div className="text-sm text-text-secondary">
                          Transfer will be processed right away
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          setTransferData({ ...transferData, schedule: 'scheduled' })
                        }
                        className={`w-full rounded-none border p-3 text-left transition-all duration-110 ${
                          transferData.schedule === 'scheduled'
                            ? 'border-interactive bg-brand-10'
                            : 'border-border-subtle hover:border-border-strong'
                        }`}
                      >
                        <div className="font-medium text-text-primary">
                          Schedule for Later
                        </div>
                        <div className="text-sm text-text-secondary">
                          Choose a future date for the transfer
                        </div>
                      </button>
                    </div>
                  </div>

                  {transferData.schedule === 'scheduled' && (
                    <Input
                      label="Scheduled Date"
                      type="date"
                      value={transferData.scheduledDate}
                      onChange={(e) =>
                        setTransferData({ ...transferData, scheduledDate: e.target.value })
                      }
                      error={errors.scheduledDate}
                      isFullWidth
                      min={new Date().toISOString().split('T')[0]}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-text-primary">
                  Review Transfer
                </h2>

                <Alert variant="info">
                  Please review the details carefully before confirming the transfer.
                </Alert>

                <div className="space-y-4">
                  {/* From */}
                  <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                    <div className="text-sm text-text-secondary">From</div>
                    <div className="mt-1 font-medium text-text-primary">
                      {fromAccount?.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {fromAccount?.accountNumber}
                    </div>
                    <div className="mt-2 text-sm text-text-secondary">
                      Available Balance: ${fromAccount?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* To */}
                  <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                    <div className="text-sm text-text-secondary">To</div>
                    <div className="mt-1 font-medium text-text-primary">
                      {toAccount?.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {toAccount?.accountNumber} • {toAccount?.bank}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                    <div className="text-sm text-text-secondary">Transfer Amount</div>
                    <div className="mt-1 text-3xl font-medium text-interactive">
                      ${parseFloat(transferData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 rounded-none border border-border-subtle bg-layer-02 p-4">
                    {transferData.memo && (
                      <div className="flex justify-between">
                        <span className="text-sm text-text-secondary">Memo</span>
                        <span className="text-sm text-text-primary">
                          {transferData.memo}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Processing Time</span>
                      <span className="text-sm text-text-primary">
                        {transferData.schedule === 'immediate'
                          ? 'Immediate'
                          : `Scheduled for ${new Date(transferData.scheduledDate!).toLocaleDateString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Transfer Fee</span>
                      <span className="text-sm text-success">$0.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Complete */}
            {step === 4 && (
              <div className="space-y-6 py-8 text-center">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                    <svg
                      className="h-10 w-10 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-medium text-text-primary">
                    Transfer Successful!
                  </h2>
                  <p className="mt-2 text-text-secondary">
                    Your transfer has been processed successfully
                  </p>
                </div>

                {/* Transaction Summary */}
                <div className="mx-auto max-w-md space-y-4">
                  <div className="rounded-none border-2 border-success bg-success/5 p-6">
                    <div className="text-sm text-text-secondary">Transaction ID</div>
                    <div className="mt-1 font-mono text-lg font-medium text-text-primary">
                      {transactionId}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-none border border-border-subtle bg-layer-02 p-6 text-left">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Amount Sent</span>
                      <span className="font-medium text-text-primary">
                        ${parseFloat(transferData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">To</span>
                      <span className="font-medium text-text-primary">
                        {toAccount?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Date</span>
                      <span className="font-medium text-text-primary">
                        {new Date().toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Status</span>
                      <Badge variant="success">Completed</Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" isFullWidth>
                      Download Receipt
                    </Button>
                    <Button variant="primary" isFullWidth onClick={handleReset}>
                      New Transfer
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardBody>

          {/* Footer Navigation */}
          {step < 4 && (
            <CardFooter>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                >
                  {step === 3 ? 'Confirm Transfer' : 'Continue'}
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export const MultistepBankingTransfer: Story = {
  render: () => <BankingTransferApp />,
};
