export const usePostStatusList = () => {
  return [
    {
      id: 'ignored',
      title: 'Ignored',
      color: 'success',
    },
    {
      id: 'pending',
      title: 'Pending',
      color: 'info',
    },
    {
      id: 'approved',
      title: 'Approved',
      color: 'primary',
    },
    {
      id: 'removed',
      title: 'Removod',
      color: 'danger',
    },
  ]
}
