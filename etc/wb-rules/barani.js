defineRule("convertValue", {
  whenChanged: "barani/temperature_raw",
  then: function (newValue) {
    // convert twos complement value
    if (newValue >= 32767) {
      newValue = newValue - 65536;
    }
    dev["barani/temperature"] = newValue / 100;
  }
});

defineRule("convertRawDewPoint", {
  whenChanged: "barani/dew_point_raw",
  then: function (newValue) {
    // convert twos complement value
    if (newValue >= 32767) {
      newValue = newValue - 65536;
    }
    dev["barani/dew_point"] = newValue / 100;
  }
});

defineRule("convertRawHumidity", {
  whenChanged: "barani/humidity_raw",
  then: function (newValue) {
    // do nothing for humidity
    dev["barani/humidity"] = newValue;
  }
});

defineRule("convertRawWindDirectionVoltage", {
  whenChanged: "wb-adc/A2",
  then: function (newValue) {
    // convert voltage to degrees
    max_voltage = 2.484
    max_degrees = 360
    one_degree_voltage = 0.0069
    secret_coeff = 0.455 // zero value starts from 0.455V

    if (newValue < secret_coeff) {
        // convert negative value
        voltage = max_voltage - secret_coeff + newValue;
    } else {
        voltage = newValue - secret_coeff
    }
    degrees = voltage / one_degree_voltage;
    dev["barani/wind_direction"] = degrees.toFixed(0);
  }
});
