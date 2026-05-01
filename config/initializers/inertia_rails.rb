InertiaRails.configure do |config|
  # Include empty errors hash in all responses (opt-in for InertiaRails 4.0 compatibility)
  config.always_include_errors_hash = true

  # Use <script type="application/json"> for initial page data, required by @inertiajs/react v3+
  config.use_script_element_for_initial_page = true
end
