app.controller('SidebarCtrl', ['UIFactory', '$state', function(UI, $state) {
	this.toggleNav = UI.toggleNav;
	this.isActivePage = function(page) {
		if ( $state.current.name === page ) {
			return true;
		}
		return false;
	}
}]);