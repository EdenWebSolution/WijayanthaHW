﻿function showToastr(data) {

    var message = null;

    if (data.status == "success") {
        toastr.success(data.message, data.title);

    }

    else if (data.status = "error") {
        toastr.error(data.message, data.title);

    }

    else if (data.status == "info") {
        toastr.info(data.message, data.title);
    }

    else {
        toastr.warning(data.message, data.title);
    }
}