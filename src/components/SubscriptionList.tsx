import Subscription from './Subscription';

const subscriptions = [
  {
    id: 1,
    name: 'netflix',
    dueDate: 5,
    price: 99.9,
    cycle: 'MONTHLY',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'amazon prime',
    dueDate: 5,
    price: 29.9,
    cycle: 'MONTHLY',
    status: 'CANCELED',
  },
  {
    id: 3,
    name: 'disney plus',
    dueDate: 5,
    price: 99.9,
    cycle: 'MONTHLY',
    status: 'ACTIVE',
  },
  {
    id: 4,
    name: 'hbo',
    dueDate: 5,
    price: 99.9,
    cycle: 'MONTHLY',
    status: 'CANCELED',
  },
  {
    id: 5,
    name: '',
    dueDate: 5,
    price: 301.9,
    cycle: 'YEARLY',
    status: 'ACTIVE',
  },
];

const SubscriptionList = () => {
  return (
    <ul className="container grid gap-4 pb-8">
      {subscriptions.map((subscription) => (
        <Subscription key={subscription.id} {...subscription} />
      ))}
    </ul>
  );
};

export default SubscriptionList;
