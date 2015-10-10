define(['common/Concurrent'],
function(Concurrent) {
	var started = false;
	return {
		start: function(registry, stepCb, completeCb) {
			var taskEntries = registry.get('strut.StartupTask');//Charges all startupTask (initialized in features)
			var countdown = new Concurrent.countdown(taskEntries.length,
				stepCb, completeCb);
			taskEntries.forEach(function(taskEntry) {
				var task = taskEntry.service();
				task.run(countdown.decrement);
			});
		}
	};
});