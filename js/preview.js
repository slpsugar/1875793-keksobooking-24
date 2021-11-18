const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const FullSizeAvatar = {
  WIDTH: '70',
  HEIGHT: '70',
  PADDING: '0',
};
const DefaultSettings = {
  SOURCE: 'img/muffin-grey.svg',
  WIDTH: '40',
  HEIGHT: '44',
};
const avatarUpload = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const accomodationUpload = document.querySelector('.ad-form__upload input[type=file]');
const accomodationPreview = document.querySelector('.ad-form__photo');

const resetPhoto = () => accomodationPreview.hasChildNodes() ? accomodationPreview.removeChild(accomodationPreview.childNodes[0]) : '';
const resetAvatar = () => {
  avatarPreview.src = DefaultSettings.SOURCE;
  avatarPreview.width = DefaultSettings.WIDTH;
  avatarPreview.height = DefaultSettings.HEIGHT;
  avatarPreviewContainer.removeAttribute('style');
};

avatarUpload.addEventListener('change', () => {
  const avatar = avatarUpload.files[0];
  const avatarName = avatar.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => avatarName.endsWith(type));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
    avatarPreview.width = FullSizeAvatar.WIDTH;
    avatarPreview.height = FullSizeAvatar.HEIGHT;
    avatarPreviewContainer.style.padding = FullSizeAvatar.PADDING;
  }
});

accomodationUpload.addEventListener('change', () => {
  resetPhoto();
  const photo = accomodationUpload.files[0];
  const photoName = photo.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => photoName.endsWith(type));
  if (matches) {
    const accomodationPicture = document.createElement('img');
    accomodationPicture.src = URL.createObjectURL(photo);
    accomodationPicture.width = FullSizeAvatar.WIDTH;
    accomodationPicture.height = FullSizeAvatar.HEIGHT;
    accomodationPreview.appendChild(accomodationPicture);
  }
});

export {resetAvatar, resetPhoto};
