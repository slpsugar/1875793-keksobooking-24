const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const FULL_SIZE_AVATAR = {
  width: '70',
  height: '70',
  padding: '0',
};
const DEFAULT_SETTINGS = {
  source: 'img/muffin-grey.svg',
  width: '40',
  height: '44',
};

const avatarUpload = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewContainer = document.querySelector('.ad-form-header__preview');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const accomodationUpload = document.querySelector('.ad-form__upload input[type=file]');
const accomodationPreview = document.querySelector('.ad-form__photo');

const resetPhoto = () => accomodationPreview.hasChildNodes() ? accomodationPreview.removeChild(accomodationPreview.childNodes[0]) : '';
const resetAvatar = () => {
  avatarPreview.src = DEFAULT_SETTINGS.source;
  avatarPreview.width = DEFAULT_SETTINGS.width;
  avatarPreview.height = DEFAULT_SETTINGS.height;
  avatarPreviewContainer.removeAttribute('style');
};

avatarUpload.addEventListener('change', () => {
  const avatar = avatarUpload.files[0];
  const avatarName = avatar.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => avatarName.endsWith(type));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
    avatarPreview.width = FULL_SIZE_AVATAR.width;
    avatarPreview.height = FULL_SIZE_AVATAR.height;
    avatarPreviewContainer.style.padding = FULL_SIZE_AVATAR.padding;
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
    accomodationPicture.width = FULL_SIZE_AVATAR.width;
    accomodationPicture.height = FULL_SIZE_AVATAR.height;
    accomodationPreview.appendChild(accomodationPicture);
  }
});

export {resetAvatar, resetPhoto};
