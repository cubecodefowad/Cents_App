import json
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns

def load_expenses(file_path='expenses.json'):
    """Load expenses from JSON file."""
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            return data.get('expenses', [])  # Get the expenses array from the nested structure
    except FileNotFoundError:
        print(f"Error: {file_path} not found.")
        return []

def analyze_expenses(expenses):
    """Analyze expenses and generate insights."""
    if not expenses:
        return "No expenses data available."

    # Convert to DataFrame
    df = pd.DataFrame(expenses)
    df['date'] = pd.to_datetime(df['date'])
    df['amount'] = pd.to_numeric(df['amount'])

    # Basic statistics
    total_spent = df['amount'].sum()
    avg_expense = df['amount'].mean()
    max_expense = df['amount'].max()
    min_expense = df['amount'].min()

    # Category analysis
    category_totals = df.groupby('category')['amount'].sum().sort_values(ascending=False)
    category_percentages = (category_totals / total_spent * 100).round(2)

    # Monthly analysis
    monthly_totals = df.groupby(df['date'].dt.strftime('%Y-%m'))['amount'].sum()

    # Generate report
    report = f"""
Expense Analysis Report
=====================
Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Summary Statistics:
-----------------
Total Spent: ${total_spent:.2f}
Average Expense: ${avg_expense:.2f}
Largest Expense: ${max_expense:.2f}
Smallest Expense: ${min_expense:.2f}

Category Breakdown:
-----------------
"""
    for category, amount in category_totals.items():
        percentage = category_percentages[category]
        report += f"{category}: ${amount:.2f} ({percentage}%)\n"

    report += "\nMonthly Breakdown:\n-----------------\n"
    for month, amount in monthly_totals.items():
        report += f"{month}: ${amount:.2f}\n"

    return report

def generate_visualizations(expenses, output_dir='reports'):
    """Generate visualizations for expense data."""
    if not expenses:
        return

    # Create output directory if it doesn't exist
    import os
    os.makedirs(output_dir, exist_ok=True)

    # Convert to DataFrame
    df = pd.DataFrame(expenses)
    df['date'] = pd.to_datetime(df['date'])
    df['amount'] = pd.to_numeric(df['amount'])

    # Set style
    sns.set_style('whitegrid')
    plt.rcParams['figure.figsize'] = (12, 6)

    # Category distribution pie chart
    plt.figure()
    category_totals = df.groupby('category')['amount'].sum()
    plt.pie(category_totals, labels=category_totals.index, autopct='%1.1f%%')
    plt.title('Expense Distribution by Category')
    plt.savefig(f'{output_dir}/category_distribution.png')
    plt.close()

    # Monthly trend line chart
    plt.figure()
    monthly_totals = df.groupby(df['date'].dt.strftime('%Y-%m'))['amount'].sum()
    monthly_totals.plot(kind='line', marker='o')
    plt.title('Monthly Expense Trend')
    plt.xlabel('Month')
    plt.ylabel('Amount ($)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(f'{output_dir}/monthly_trend.png')
    plt.close()

    # Category box plot
    plt.figure()
    sns.boxplot(x='category', y='amount', data=df)
    plt.title('Expense Distribution by Category')
    plt.xlabel('Category')
    plt.ylabel('Amount ($)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(f'{output_dir}/category_boxplot.png')
    plt.close()

def export_to_csv(expenses, output_file='expenses.csv'):
    """Export expenses to CSV file."""
    if not expenses:
        return "No expenses data available."

    df = pd.DataFrame(expenses)
    df.to_csv(output_file, index=False)
    return f"Data exported to {output_file}"

if __name__ == '__main__':
    # Load expenses
    expenses = load_expenses()

    if expenses:
        # Generate analysis report
        report = analyze_expenses(expenses)
        print(report)

        # Generate visualizations
        generate_visualizations(expenses)

        # Export to CSV
        export_to_csv(expenses) 