export const usePostReportList = () => {
  return [
    {
      id: 'unauthorize_trademark',
      title: 'Unauthorized trademark',
      color: 'primary',
    },
    {
      id: 'unauthorize_copyright',
      title: 'Unauthorized use of copyrighted materials',
      color: 'secondary',
    },
    {
      id: 'child_exploitation',
      title: 'Child sexual exploitation',
      color: 'success',
    },
    {
      id: 'pornography',
      title: 'Pornography (No NSFW Tag)',
      color: 'danger',
    },
    {
      id: 'private_information',
      title: 'Private information posted on Myriad',
      color: 'warning',
    },
    {
      id: 'abusive_violent',
      title: 'Abusive behavior and violent threats',
      color: 'info',
    },
    {
      id: 'spam',
      title: 'Spam and system abuse',
      color: 'dark',
    },
  ]
}
