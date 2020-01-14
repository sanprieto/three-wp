<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       author-address@mailbox.tld
 * @since      1.0.0
 *
 * @package    Three_Test
 * @subpackage Three_Test/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Three_Test
 * @subpackage Three_Test/public
 * @author     author <email>
 */
class Three_Test_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Three_Test_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Three_Test_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/three-test-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Three_Test_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Three_Test_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_register_script( 'threejs', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js' );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) .'js/three-test-public.js', array( 'jquery', 'threejs' ), $this->version, true );


	}

		public function filter_the_content_in_the_main_loop( $content ) {

			global $post;

		 	if ($post->ID== 1871 ){

		 		    // Check if we're inside the main loop in a single post page.
		 		    if ( is_front_page() && in_the_loop() && is_main_query() ) {
		 		    	

		 				if (empty($color)){
		 					$color = '#6699FF';
		 				};
		 				echo '<canvas id="beginMagic" class="three-test" data-id="' . $post->ID . '" data-color="' . $color . '"></canvas>'.$content;
		 		        //return $content.= '<canvas id="beginMagic" class="three-test" data-id="' . $post->ID . '" data-color="' . $color . '"></canvas>';

		 		    }
		 		 
		 		    

		 	}else{
				return $content;
		 	}
		 	
		 	

		}

}
