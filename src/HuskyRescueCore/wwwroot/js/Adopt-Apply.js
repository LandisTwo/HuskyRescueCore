﻿$('body').toggleClass('page-loader-1');

var paypalButton = document.querySelector('.paypal-button');
var submitBtn = document.getElementById('submitButton');

var globalPayPalInstance = {};
var isPaypalInit = false;
var globalHostedInstance = {};
var isHostedInit = false;

$(function () {
    PaymentType();

    $('select[name="BrainTreePayment.PaymentMethod"]').change(PaymentType);

    $('#IsAllAdultsAgreedOnAdoption').click(function () {
        if ($('#IsAllAdultsAgreedOnAdoption:checked').val() === 'true') {
            $('#IsAllAdultsAgreedOnAdoptionReason_div').hide();
            $('#IsAllAdultsAgreedOnAdoptionReason').rules('remove', 'required');
        } else {
            $('#IsAllAdultsAgreedOnAdoptionReason_div').show();
            $('#IsAllAdultsAgreedOnAdoptionReason').rules("add", {
                required: true,
                messages: { required: "reason for all adults not agreeing on adoption is required" }
            });
        }
    });

    $('.ResidenceRent').hide();
    $('#ResidenceOwnershipId').change(function () {
        if ($('#ResidenceOwnershipId').val() === '2') {
            $('.ResidenceRent').show();
            $('#ResidenceIsPetAllowed').rules("add", { required: true, messages: { required: "is pet allowed required" } });
            $('#ResidenceIsPetDepositRequired').rules("add", { required: true, messages: { required: "is pet deposit required" } });
            $('#ResidencePetSizeWeightLimit').rules("add", { required: true, messages: { required: "is pet weight limit required" } });
            $('#ResidenceLandlordName').rules("add", { required: true, messages: { required: "landlord or property owner name is required" } });
            $('#ResidenceLandlordNumber').rules("add", { required: true, messages: { required: "landlord phone number required" } });
        } else {
            $('.ResidenceRent').hide();
            $('#ResidenceIsPetAllowed').rules('remove', 'required');
            $('#ResidenceIsPetDepositRequired').rules('remove', 'required');
            $('#ResidencePetSizeWeightLimit').rules('remove', 'required');
            $('#ResidenceLandlordName').rules('remove', 'required');
            $('#ResidenceLandlordNumber').rules('remove', 'required');
        }
    });

    $('.ResidencePetDeposit').hide();
    $('input[name="ResidenceIsPetDepositRequired"]').click(function () {
        if ($('input[name="ResidenceIsPetDepositRequired"]:checked').val() === 'false') {
            $('.ResidencePetDeposit').hide();
            $('#ResidencePetDepositAmount').rules('remove', 'required');
            $('#ResidenceIsPetDepositPaid').rules('remove', 'required');
            $('#ResidencePetDepositCoverageId').rules('remove', 'required');
        } else {
            $('.ResidencePetDeposit').show();
            $('#ResidencePetDepositAmount').rules("add", {
                required: true,
                messages: { required: "pet deposit amount required" }
            });
            $('#ResidenceIsPetDepositPaid').rules("add", {
                required: true,
                messages: { required: "is pet deposit paid required" }
            });
            $('#ResidencePetDepositCoverageId').rules("add", {
                required: true,
                messages: { required: "pet deposit coverage required" }
            });
        }
    });

    $('.ResidenceFence').hide();
    $('input[name="ResidenceIsYardFenced"]').click(function () {
        if ($('input[name="ResidenceIsYardFenced"]:checked').val() === 'false') {
            $('.ResidenceFence').hide();
            $('#ResidenceFenceTypeHeight').rules('remove', 'required');
        } else {
            $('.ResidenceFence').show();
            $('#ResidenceFenceTypeHeight').rules("add", {
                required: true,
                messages: { required: "fence type and height are required" }
            });
        }
    });

    $('.StudentType').hide();
    $('input[name="IsAppOrSpouseStudent"]').click(function () {
        if ($('input[name="IsAppOrSpouseStudent"]:checked').val() === 'false') {
            $('.StudentType').hide();
            $('#StudentTypeId').rules('remove', 'required');
        } else {
            $('.StudentType').show();
            $('#StudentTypeId').rules("add", {
                required: true,
                messages: { required: "student type is required" }
            });
        }
    });

    $('.TravelFrequent').hide();
    $('input[name="IsAppTravelFrequent"]').click(function () {
        if ($('input[name="IsAppTravelFrequent"]:checked').val() === 'false') {
            $('.TravelFrequent').hide();
            $('#AppTravelFrequency').rules('remove', 'required');
        } else {
            $('.TravelFrequent').show();
            $('#AppTravelFrequency').rules("add", {
                required: true,
                messages: { required: "travel frequency is required" }
            });
        }
    });

    $('.CatOwner').hide();
    $('input[name="FilterAppIsCatOwner"]').click(function () {
        if ($('input[name="FilterAppIsCatOwner"]:checked').val() === 'false') {
            $('.CatOwner').hide();
            $('#FilterAppCatsOwnedCount').rules('remove', 'required');
        } else {
            $('.CatOwner').show();
            $('#FilterAppCatsOwnedCount').rules("add", {
                required: true,
                messages: { required: "number of cats owned is required" }
            });
        }
    });

    $('.Pet1').hide();
    $('.Pet1Alter').hide();
    $('.Pet1HW').hide();
    $('.Pet1Vacc').hide();
    $('.Pet1StillOwned').hide();

    $('#Name1').change(function () {
        CheckVetRequired();
        CheckPetRequired(1);
    });
    $('#Name1').blur(function () {
        if ($('#Name1').val() !== '') {
            $('#Breed1').focus();
        } else {
            $('#Name2').focus();
        }
    });

    $('input[name="IsAltered1"]').click(function () {
        if ($('input[name="IsAltered1"]:checked').val() === 'false') {
            $('.Pet1Alter').show();
            $('#AlteredReason1').rules("add", {
                required: true,
                messages: { required: "non-altered reason is required" }
            });
        } else {
            $('.Pet1Alter').hide();
            $('#AlteredReason1').rules('remove', 'required');
        }
    });
    $('input[name="IsHwPrevention1"]').click(function () {
        if ($('input[name="IsHwPrevention1"]:checked').val() === 'false') {
            $('.Pet1HW').show();
            $('#HwPreventionReason1').rules("add", {
                required: true,
                messages: { required: "not on HW prevention reason is required" }
            });
        } else {
            $('.Pet1HW').hide();
            $('#HwPreventionReason1').rules('remove', 'required');
        }
    });
    $('input[name="IsFullyVaccinated1"]').click(function () {
        if ($('input[name="IsFullyVaccinated1"]:checked').val() === 'false') {
            $('.Pet1Vacc').show();
            $('#FullyVaccinatedReason1').rules("add", {
                required: true,
                messages: { required: "non-vaccinated reason is required" }
            });
        } else {
            $('.Pet1Vacc').hide();
            $('#FullyVaccinatedReason1').rules('remove', 'required');
        }
    });
    $('input[name="IsStillOwned1"]').click(function () {
        if ($('input[name="IsStillOwned1"]:checked').val() === 'false') {
            $('.Pet1StillOwned').show();
            $('#IsStillOwnedReason1').rules("add", {
                required: true,
                messages: { required: "reason for not owning is required" }
            });
        } else {
            $('.Pet1StillOwned').hide();
            $('#IsStillOwnedReason1').rules('remove', 'required');
        }
    });

    $('.Pet2').hide();
    $('.Pet2Alter').hide();
    $('.Pet2HW').hide();
    $('.Pet2Vacc').hide();
    $('.Pet2StillOwned').hide();

    $('#Name2').change(function () {
        CheckVetRequired();
        CheckPetRequired(2);
    });
    $('#Name2').blur(function () {
        if ($('#Name2').val() !== '') {
            $('#Breed2').focus();
        } else {
            $('#Name3').focus();
        }
    });

    $('input[name="IsAltered2"]').click(function () {
        if ($('input[name="IsAltered2"]:checked').val() === 'false') {
            $('.Pet2Alter').show();
            $('#AlteredReason2').rules("add", {
                required: true,
                messages: { required: "non-altered reason is required" }
            });
        } else {
            $('.Pet2Alter').hide();
            $('#AlteredReason2').rules('remove', 'required');
        }
    });
    $('input[name="IsHwPrevention2"]').click(function () {
        if ($('input[name="IsHwPrevention2"]:checked').val() === 'false') {
            $('.Pet2HW').show();
            $('#HwPreventionReason2').rules("add", {
                required: true,
                messages: { required: "not on HW prevention reason is required" }
            });
        } else {
            $('.Pet2HW').hide();
            $('#HwPreventionReason2').rules('remove', 'required');
        }
    });
    $('input[name="IsFullyVaccinated2"]').click(function () {
        if ($('input[name="IsFullyVaccinated2"]:checked').val() === 'false') {
            $('.Pet2Vacc').show();
            $('#FullyVaccinatedReason2').rules("add", {
                required: true,
                messages: { required: "non-vaccinated reason is required" }
            });
        } else {
            $('.Pet2Vacc').hide();
            $('#FullyVaccinatedReason2').rules('remove', 'required');
        }
    });
    $('input[name="IsStillOwned2"]').click(function () {
        if ($('input[name="IsStillOwned2"]:checked').val() === 'false') {
            $('.Pet2StillOwned').show();
            $('#IsStillOwnedReason2').rules("add", {
                required: true,
                messages: { required: "reason for not owning is required" }
            });
        } else {
            $('.Pet2StillOwned').hide();
            $('#IsStillOwnedReason2').rules('remove', 'required');
        }
    });

    $('.Pet3').hide();
    $('.Pet3Alter').hide();
    $('.Pet3HW').hide();
    $('.Pet3Vacc').hide();
    $('.Pet3StillOwned').hide();

    $('#Name3').change(function () {
        CheckVetRequired();
        CheckPetRequired(3);
    });
    $('#Name3').blur(function () {
        if ($('#Name3').val() !== '') {
            $('#Breed3').focus();
        } else {
            $('#Name4').focus();
        }
    });

    $('input[name="IsAltered3"]').click(function () {
        if ($('input[name="IsAltered3"]:checked').val() === 'false') {
            $('.Pet3Alter').show();
            $('#AlteredReason3').rules("add", {
                required: true,
                messages: { required: "non-altered reason is required" }
            });
        } else {
            $('.Pet3Alter').hide();
            $('#AlteredReason3').rules('remove', 'required');
        }
    });
    $('input[name="IsHwPrevention3"]').click(function () {
        if ($('input[name="IsHwPrevention3"]:checked').val() === 'false') {
            $('.Pet3HW').show();
            $('#HwPreventionReason3').rules("add", {
                required: true,
                messages: { required: "not on HW prevention reason is required" }
            });
        } else {
            $('.Pet3HW').hide();
            $('#HwPreventionReason3').rules('remove', 'required');
        }
    });
    $('input[name="IsFullyVaccinated3"]').click(function () {
        if ($('input[name="IsFullyVaccinated3"]:checked').val() === 'false') {
            $('.Pet3Vacc').show();
            $('#FullyVaccinatedReason3').rules("add", {
                required: true,
                messages: { required: "non-vaccinated reason is required" }
            });
        } else {
            $('.Pet3Vacc').hide();
            $('#FullyVaccinatedReason3').rules('remove', 'required');
        }
    });
    $('input[name="IsStillOwned3"]').click(function () {
        if ($('input[name="IsStillOwned3"]:checked').val() === 'false') {
            $('.Pet3StillOwned').show();
            $('#IsStillOwnedReason3').rules("add", {
                required: true,
                messages: { required: "reason for not owning is required" }
            });
        } else {
            $('.Pet3StillOwned').hide();
            $('#IsStillOwnedReason3').rules('remove', 'required');
        }
    });

    $('.Pet4').hide();
    $('.Pet4Alter').hide();
    $('.Pet4HW').hide();
    $('.Pet4Vacc').hide();
    $('.Pet4StillOwned').hide();

    $('#Name4').change(function () {
        CheckVetRequired();
        CheckPetRequired(4);
    });
    $('#Name4').blur(function () {
        if ($('#Name4').val() !== '') {
            $('#Breed4').focus();
        } else {
            $('#Name5').focus();
        }
    });

    $('input[name="IsAltered4"]').click(function () {
        if ($('input[name="IsAltered4"]:checked').val() === 'false') {
            $('.Pet4Alter').show();
            $('#AlteredReason4').rules("add", {
                required: true,
                messages: { required: "non-altered reason is required" }
            });
        } else {
            $('.Pet4Alter').hide();
            $('#AlteredReason4').rules('remove', 'required');
        }
    });
    $('input[name="IsHwPrevention4"]').click(function () {
        if ($('input[name="IsHwPrevention4"]:checked').val() === 'false') {
            $('.Pet4HW').show();
            $('#HwPreventionReason4').rules("add", {
                required: true,
                messages: { required: "not on HW prevention reason is required" }
            });
        } else {
            $('.Pet4HW').hide();
            $('#HwPreventionReason4').rules('remove', 'required');
        }
    });
    $('input[name="IsFullyVaccinated4"]').click(function () {
        if ($('input[name="IsFullyVaccinated4"]:checked').val() === 'false') {
            $('.Pet4Vacc').show();
            $('#FullyVaccinatedReason4').rules("add", {
                required: true,
                messages: { required: "non-vaccinated reason is required" }
            });
        } else {
            $('.Pet4Vacc').hide();
            $('#FullyVaccinatedReason4').rules('remove', 'required');
        }
    });
    $('input[name="IsStillOwned4"]').click(function () {
        if ($('input[name="IsStillOwned4"]:checked').val() === 'false') {
            $('.Pet4StillOwned').show();
            $('#IsStillOwnedReason4').rules("add", {
                required: true,
                messages: { required: "reason for not owning is required" }
            });
        } else {
            $('.Pet4StillOwned').hide();
            $('#IsStillOwnedReason4').rules('remove', 'required');
        }
    });

    $('.Pet5').hide();
    $('.Pet5Alter').hide();
    $('.Pet5HW').hide();
    $('.Pet5Vacc').hide();
    $('.Pet5StillOwned').hide();

    $('#Name5').change(function () {
        CheckVetRequired();
        CheckPetRequired(5);
    });
    $('#Name5').blur(function () {
        if ($('#Name5').val() !== '') {
            $('#Breed5').focus();
        } else {
            $('#Comments').focus();
        }
    });

    $('input[name="IsAltered5"]').click(function () {
        if ($('input[name="IsAltered5"]:checked').val() === 'false') {
            $('.Pet5Alter').show();
            $('#AlteredReason5').rules("add", {
                required: true,
                messages: { required: "non-altered reason is required" }
            });
        } else {
            $('.Pet5Alter').hide();
            $('#AlteredReason5').rules('remove', 'required');
        }
    });
    $('input[name="IsHwPrevention5"]').click(function () {
        if ($('input[name="IsHwPrevention5"]:checked').val() === 'false') {
            $('.Pet5HW').show();
            $('#HwPreventionReason5').rules("add", {
                required: true,
                messages: { required: "not on HW prevention reason is required" }
            });
        } else {
            $('.Pet5HW').hide();
            $('#HwPreventionReason5').rules('remove', 'required');
        }
    });
    $('input[name="IsFullyVaccinated5"]').click(function () {
        if ($('input[name="IsFullyVaccinated5"]:checked').val() === 'false') {
            $('.Pet5Vacc').show();
            $('#FullyVaccinatedReason5').rules("add", {
                required: true,
                messages: { required: "non-vaccinated reason is required" }
            });
        } else {
            $('.Pet5Vacc').hide();
            $('#FullyVaccinatedReason5').rules('remove', 'required');
        }
    });
    $('input[name="IsStillOwned5"]').click(function () {
        if ($('input[name="IsStillOwned5"]:checked').val() === 'false') {
            $('.Pet5StillOwned').show();
            $('#IsStillOwnedReason5').rules("add", {
                required: true,
                messages: { required: "reason for not owning is required" }
            });
        } else {
            $('.Pet5StillOwned').hide();
            $('#IsStillOwnedReason5').rules('remove', 'required');
        }
    });
});

function PaymentType() {
    var paymentType = $('select[name="BrainTreePayment.PaymentMethod"]').val();

    switch (paymentType) {
        case '0': // PayPal

            braintree.client.create({
                authorization: $('#clientToken').val()
            },
            function (err, clientInstance) {
                // Creation of any other components...

                braintree.dataCollector.create({
                    client: clientInstance,
                    kount: true
                },
                function (err, dataCollectorInstance) {
                    if (err) {
                        // Handle error in creation of data collector
                        return;
                    }
                    // At this point, you should access the dataCollectorInstance.deviceData value and provide it
                    // to your server, e.g. by injecting it into your form as a hidden input.
                    var deviceData = dataCollectorInstance.deviceData;
                    $('#BrainTreePayment_DeviceData').val(deviceData);
                });
                // Create a PayPal component.
                braintree.paypal.create({
                    client: clientInstance
                },
                function (paypalErr, paypalInstance) {
                    // Stop if there was a problem creating PayPal.
                    // This could happen if there was a network error or if it's incorrectly
                    // configured.
                    if (paypalErr) {
                        console.error('Error creating PayPal:', paypalErr);
                        return;
                    }

                    // Enable the button.
                    paypalButton.removeAttribute('disabled');

                    globalPayPalInstance = paypalInstance;
                    isPaypalInit = true;
                    if (isHostedInit) {
                        isHostedInit = false;
                        globalHostedInstance.teardown(function (teardownErr) {
                            if (teardownErr) {
                                console.error('Could not tear down Paypal Fields!', teardownErr);
                            } else {
                                console.info('Paypal Fields has been torn down!');
                            }
                        });
                    }

                    // When the button is clicked, attempt to tokenize.
                    paypalButton.addEventListener('click', function (event) {
                        paypalButton.setAttribute('disabled', 'disabled');
                        // Because tokenization opens a popup, this has to be called as a result of
                        // customer action, like clicking a button—you cannot call this at any time.

                        var paypalOptions = {
                            flow: 'checkout',
                            intent: 'sale',
                            currency: 'USD',
                            amount: Number(Math.round($('#ApplicationFeeAmount').val() + 'e2') + 'e-2').toFixed(2)
                        };
                        console.info('paypal token options', paypalOptions);
                        paypalInstance.tokenize(paypalOptions,
                        function (tokenizeErr, payload) {
                            paypalButton.removeAttribute('disabled');

                            // Stop if there was an error.
                            if (tokenizeErr) {
                                switch (tokenizeErr.code) {
                                    case 'PAYPAL_POPUP_CLOSED':
                                        console.error('Customer closed PayPal popup.');
                                        break;
                                    case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
                                        console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
                                        break;
                                    case 'PAYPAL_FLOW_FAILED':
                                        console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
                                        break;
                                    default:
                                        console.error('Error!', tokenizeErr);
                                }
                                return;
                            }

                            // Tokenization succeeded!
                            paypalButton.setAttribute('disabled', true);
                            console.log('Got a nonce! You should submit this to your server.');
                            console.log(payload.nonce);
                            document.querySelector('input[name="BrainTreePayment.Nonce"]').value = payload.nonce;
                        });

                    }, false);

                });
            });

            $('#paypalrow').show();
            $('#creditcardrow').hide();

            $('#BrainTreePayment_PayeeAddressStreet1').rules('remove', 'required');
            $('#BrainTreePayment_PayeeAddressCity').rules('remove', 'required');
            $('#BrainTreePayment_PayeeAddressStateId').rules('remove', 'required');
            $('#BrainTreePayment_PayeeAddressPostalCode').rules('remove', 'required');
            break;
        case '1':
            braintree.client.create({
                authorization: $('#clientToken').val()
            },
            function (err, clientInstance) {
                // Creation of any other components...

                braintree.dataCollector.create({
                    client: clientInstance,
                    kount: true
                },
                function (err, dataCollectorInstance) {
                    if (err) {
                        // Handle error in creation of data collector
                        return;
                    }
                    // At this point, you should access the dataCollectorInstance.deviceData value and provide it
                    // to your server, e.g. by injecting it into your form as a hidden input.
                    var deviceData = dataCollectorInstance.deviceData;
                    $('#BrainTreePayment_DeviceData').val(deviceData);
                });

                braintree.hostedFields.create({
                    client: clientInstance,
                    styles: {
                        'input': {
                            'font-size': '14pt'
                        },
                        'input.invalid': {
                            'color': 'red'
                        },
                        'input.valid': {
                            'color': 'green'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#card-number',
                            placeholder: '4111 1111 1111 1111'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: '123'
                        },
                        expirationDate: {
                            selector: '#expiration-date',
                            placeholder: '10 / 2019'
                        }
                    }
                },
                function (hostedFieldsErr, hostedFieldsInstance) {
                    if (hostedFieldsErr) {
                        // Handle error in Hosted Fields creation
                        console.error('Hosted Fields Error', hostedFieldsErr);
                        return;
                    }

                    submitBtn.removeAttribute('disabled');
                    globalHostedInstance = hostedFieldsInstance;
                    isHostedInit = true;
                    if (isPaypalInit) {
                        isPaypalInit = false;
                        globalPayPalInstance.teardown(function (teardownErr) {
                            if (teardownErr) {
                                console.error('Could not tear down Paypal Fields!', teardownErr);
                            } else {
                                console.info('Paypal Fields has been torn down!');
                            }
                        });
                    }

                    document.getElementById('applyForm').addEventListener('submit', function (event) {
                        event.preventDefault();
                        submitBtn.setAttribute('disabled', 'disabled');
                        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                            submitBtn.removeAttribute('disabled');
                            if (tokenizeErr) {
                                // Handle error in Hosted Fields tokenization
                                switch (tokenizeErr.code) {
                                    case 'HOSTED_FIELDS_FIELDS_EMPTY':
                                        console.error('All fields are empty! Please fill out the form.');
                                        break;
                                    case 'HOSTED_FIELDS_FIELDS_INVALID':
                                        console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
                                        break;
                                    case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
                                        console.error('Tokenization failed server side. Is the card valid?');
                                        break;
                                    case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
                                        console.error('Network error occurred when tokenizing.');
                                        break;
                                    default:
                                        console.error('Something bad happened!', tokenizeErr);
                                }
                                return;
                            }

                            // Put `payload.nonce` into the `payment-method-nonce` input, and then
                            // submit the form. Alternatively, you could send the nonce to your server
                            // with AJAX.
                            document.querySelector('input[name="BrainTreePayment.Nonce"]').value = payload.nonce;
                            console.log('Got nonce:', payload.nonce);
                            $('body').toggleClass('page-loader-1');
                            $('#applyForm').submit();
                        });
                    }, false);
                });
            });

            $('#paypalrow').hide();
            $('#creditcardrow').show();

            $('#BrainTreePayment_PayeeAddressStreet1').rules("add", {
                required: true,
                messages: { required: "address street required" }
            });
            $('#BrainTreePayment_PayeeAddressCity').rules("add", {
                required: true,
                messages: { required: "address city required" }
            });
            $('#BrainTreePayment_PayeeAddressStateId').rules("add", {
                required: true,
                messages: { required: "address state required" }
            });
            $('#BrainTreePayment_PayeeAddressPostalCode').rules("add", {
                required: true,
                messages: { required: "address ZIP required" }
            });
            break;
    }
    $('body').toggleClass('page-loader-1');
}

function CheckVetRequired() {
    if ($('#Name1').val() !== '' ||
       $('#Name2').val() !== '' ||
       $('#Name3').val() !== '' ||
       $('#Name4').val() !== '' ||
       $('#Name5').val() !== '') {
        $('#VeterinarianOfficeName').rules("add", {
            required: true,
            messages: { required: "vet office name is required" }
        });
        $('#VeterinarianDoctorName').rules("add", {
            required: true,
            messages: { required: "vet doctor name is required" }
        });
        $('#PhoneNumber').rules("add", {
            required: true,
            messages: { required: "vet phone number is required" }
        });
    }
    else {
        $('#VeterinarianOfficeName').rules('remove', 'required');
        $('#VeterinarianDoctorName').rules('remove', 'required');
        $('#PhoneNumber').rules('remove', 'required');
    }
}

function CheckPetRequired(petNumber) {
    if ($('#Name' + petNumber).val() !== '') {
        $('.Pet' + petNumber).show();
        $('#Breed' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': breed is required' } });
        $('#Sex' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': sex is required' } });
        $('#Age' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': age of pet is required' } });
        $('#OwnershipLength' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': length of pet ownership is required' } });
        $('#IsAltered' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': alteration required' } });
        $('#IsHwPrevention' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': heartworm prevention required' } });
        $('#IsFullyVaccinated' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': vaccination is required' } });
        $('#IsStillOwned' + petNumber).rules('add', { required: true, messages: { required: 'pet #' + petNumber + ': current ownership of pet is required' } });
    } else {
        $('#Breed' + petNumber).rules('remove', 'required');
        $('#Sex' + petNumber).rules('remove', 'required');
        $('#Age' + petNumber).rules('remove', 'required');
        $('#OwnershipLength' + petNumber).rules('remove', 'required');
        $('#IsAltered' + petNumber).rules('remove', 'required');
        $('#IsHwPrevention' + petNumber).rules('remove', 'required');
        $('#IsFullyVaccinated' + petNumber).rules('remove', 'required');
        $('#IsStillOwned' + petNumber).rules('remove', 'required');
        $('.Pet' + petNumber).hide();
        $('.Pet' + petNumber + 'Alter').hide();
        $('.Pet' + petNumber + 'HW').hide();
        $('.Pet' + petNumber + 'Vacc').hide();
        $('.Pet' + petNumber + 'StillOwned').hide();
    }
}

