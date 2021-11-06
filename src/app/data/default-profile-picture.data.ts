export const useDefaultProfileImageUrl = () => {
  const listProfileImage = [
    '/media/svg/avatars/001-boy.svg',
    '/media/svg/avatars/047-girl-25.svg',
    '/media/svg/avatars/006-girl-3.svg',
    '/media/svg/avatars/020-girl-11.svg',
    '/media/svg/avatars/014-girl-7.svg',
  ]

  const randomIndex = Math.floor(Math.random() * listProfileImage.length)

  return listProfileImage[randomIndex]
}
