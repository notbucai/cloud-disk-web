import Vue from 'vue';
import suffix from "file-suffix";
import { format } from "date-fns";

const utils = {
  getObjTypeIcon(type, key) {
    let iconName = "#icon-file-b-2";
    if (type === 2) {
      switch (suffix(key)) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
          iconName = "#icon-file-b-6";
          break;
        case "psd":
          iconName = "#icon-file-b-11";
          break;
        case "zip":
        case "rar":
        case "7z":
          iconName = "#icon-file-b-4";
          break;
        case "pdf":
          iconName = "#icon-file-b-14";
          break;
        case "doc":
        case "docx":
        case "pages":
          iconName = "#icon-file-b-1";
          break;
        case "xls":
        case "xlsx":
          iconName = "#icon-file-b-5";
          break;
        case "ppt":
          iconName = "#icon-file-b-";
          break;
        case "mp4":
          iconName = "#icon-file-b-9";
          break;
        case "mp3":
          iconName = "#icon-file-b-3";
          break;
        case "txt":
          iconName = "#icon-file-b-7";
          break;
        case "html":
          iconName = "#icon-file-b-16";
          break;
        default:
          iconName = "#icon-file-b-8";
          break;
      }
    }
    return iconName;
  },
  dateParse(dateStr) {
    const date = new Date(dateStr);
    return format(date, "YYYY-MM-DD HH:mm:ss");
  },
};

Vue.prototype.$utils = utils;